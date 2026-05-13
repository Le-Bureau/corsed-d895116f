/**
 * AuthContext — runId pattern
 * ---------------------------
 * `applySession` is reentrant: it can be invoked concurrently by overlapping
 * auth events (INITIAL_SESSION + TOKEN_REFRESHED, React StrictMode double
 * effects, sign-in shortly after rehydration, etc.). Each invocation performs
 * an async `checkIsAdmin` call, which means a stale (superseded) run could
 * otherwise write `setIsAdmin(false)` or `setIsLoading(false)` AFTER a newer
 * run has already populated correct state — producing a transient
 * `user && !isAdmin && !isLoading` snapshot that triggers AdminRoute to
 * redirect with a toast.
 *
 * The `runIdRef` counter is bumped at the start of every `applySession`. After
 * each `await`, we re-check `runId === runIdRef.current` before writing state.
 * Only the most recent run is allowed to mutate state. DO NOT REMOVE.
 *
 * `isRoleLoading` is a separate flag from `isLoading`:
 *   - `isLoading`     = first session check pending
 *   - `isRoleLoading` = admin role check pending for the current user
 * AdminRoute must gate on `isLoading || (user && isRoleLoading)`.
 */
import { createContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  isRoleLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const checkIsAdmin = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) {
    console.error("[AuthContext] admin check failed", error);
    return false;
  }
  return !!data;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const runIdRef = useRef(0);

  useEffect(() => {
    let mounted = true;

    const applySession = async (next: Session | null) => {
      if (!mounted) return;
      const runId = ++runIdRef.current;

      // Synchronous writes — safe to apply unconditionally; the latest event
      // wins naturally because they happen before any await.
      setSession(next);
      setUser(next?.user ?? null);

      const uid = next?.user?.id ?? null;

      if (uid) {
        setIsRoleLoading(true);
        const admin = await checkIsAdmin(uid);
        if (!mounted || runId !== runIdRef.current) return; // stale
        setIsAdmin(admin);
        setIsRoleLoading(false);
      } else {
        setIsAdmin(false);
        setIsRoleLoading(false);
      }

      if (!mounted || runId !== runIdRef.current) return; // stale
      setIsLoading(false);
    };

    // onAuthStateChange fires INITIAL_SESSION on subscribe, so we don't need
    // a separate getSession() call (which would race with this callback).
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setTimeout(() => {
        void applySession(nextSession);
      }, 0);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn: AuthContextValue["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, session, isAdmin, isLoading, isRoleLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
