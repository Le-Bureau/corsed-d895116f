import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";

export interface DraftRecord<T> {
  values: T;
  savedAt: number;
  postId: string;
}

interface UseDraftPersistenceReturn<T> {
  recoveredDraft: DraftRecord<T> | null;
  clearDraft: () => void;
  hasDraft: boolean;
}

const STORAGE_PREFIX = "cd:blog-draft:";
const DEBOUNCE_MS = 1500;
const MAX_DRAFT_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const storageKey = (postId: string) => `${STORAGE_PREFIX}${postId}`;

let quotaWarnedThisSession = false;

const safeRead = <T,>(postId: string): DraftRecord<T> | null => {
  try {
    const raw = localStorage.getItem(storageKey(postId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftRecord<T>;
    return parsed;
  } catch (e) {
    if (import.meta.env.DEV) console.warn("[draft] read failed", e);
    return null;
  }
};

const safeRemove = (postId: string) => {
  try {
    localStorage.removeItem(storageKey(postId));
  } catch (e) {
    if (import.meta.env.DEV) console.warn("[draft] remove failed", e);
  }
};

const safeWrite = <T,>(postId: string, record: DraftRecord<T>) => {
  try {
    localStorage.setItem(storageKey(postId), JSON.stringify(record));
  } catch (e) {
    if (import.meta.env.DEV) console.warn("[draft] write failed", e);
    if (!quotaWarnedThisSession) {
      quotaWarnedThisSession = true;
      toast.warning(
        "Le brouillon ne peut pas être sauvegardé localement (espace insuffisant). Sauvegarde manuelle recommandée.",
      );
    }
  }
};

// NOTE: Multi-tab limitation: if the same post is opened in two tabs, both write
// to the same key. Last writer wins. We don't lock/merge for V1.
export function useDraftPersistence<T>(
  postId: string,
  currentValues: T,
  isEnabled: boolean = true,
): UseDraftPersistenceReturn<T> {
  const [recoveredDraft, setRecoveredDraft] = useState<DraftRecord<T> | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  const initialReadDoneRef = useRef(false);
  const lastWrittenRef = useRef<string | null>(null);
  const currentValuesRef = useRef(currentValues);
  const isEnabledRef = useRef(isEnabled);

  useEffect(() => {
    currentValuesRef.current = currentValues;
    isEnabledRef.current = isEnabled;
  }, [currentValues, isEnabled]);

  // Read once per postId
  useEffect(() => {
    initialReadDoneRef.current = false;
    const found = safeRead<T>(postId);
    if (found) {
      const age = Date.now() - (found.savedAt ?? 0);
      if (age > MAX_DRAFT_AGE_MS) {
        safeRemove(postId);
        setRecoveredDraft(null);
        setHasDraft(false);
      } else {
        setRecoveredDraft(found);
        setHasDraft(true);
        lastWrittenRef.current = JSON.stringify(found.values);
      }
    } else {
      setRecoveredDraft(null);
      setHasDraft(false);
    }
    initialReadDoneRef.current = true;
  }, [postId]);

  // Debounced write
  useEffect(() => {
    if (!isEnabled) return;
    if (!initialReadDoneRef.current) return;
    const serialized = JSON.stringify(currentValues);
    if (serialized === lastWrittenRef.current) return;
    const t = setTimeout(() => {
      safeWrite<T>(postId, {
        values: currentValues,
        savedAt: Date.now(),
        postId,
      });
      lastWrittenRef.current = serialized;
      setHasDraft(true);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [currentValues, isEnabled, postId]);

  // Flush immediately when the tab is hidden/reloaded. This protects the last
  // keystrokes that haven't reached the debounced save yet.
  useEffect(() => {
    const writeNow = () => {
      if (!isEnabledRef.current) return;
      if (!initialReadDoneRef.current) return;
      const serialized = JSON.stringify(currentValuesRef.current);
      if (serialized === lastWrittenRef.current) return;
      safeWrite<T>(postId, {
        values: currentValuesRef.current,
        savedAt: Date.now(),
        postId,
      });
      lastWrittenRef.current = serialized;
      setHasDraft(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") writeNow();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", writeNow);
    window.addEventListener("beforeunload", writeNow);

    return () => {
      writeNow();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", writeNow);
      window.removeEventListener("beforeunload", writeNow);
    };
  }, [postId]);

  const clearDraft = useCallback(() => {
    safeRemove(postId);
    setRecoveredDraft(null);
    setHasDraft(false);
    lastWrittenRef.current = null;
  }, [postId]);

  return { recoveredDraft, clearDraft, hasDraft };
}
