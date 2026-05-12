import { useEffect } from "react";

interface Props {
  when: boolean;
  message?: string;
}

/**
 * Warns the user before leaving (closing tab / browser back) when there are
 * unsaved changes. In-app navigation is handled separately via window.confirm
 * in the cancel button, since react-router v6 removed Prompt.
 */
const UnsavedChangesPrompt = ({
  when,
  message = "Tu as des modifications non enregistrées. Quitter quand même ?",
}: Props) => {
  useEffect(() => {
    if (!when) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [when, message]);

  return null;
};

export default UnsavedChangesPrompt;
