import { createContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
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
  const lastCheckedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let initialDone = false;

    const applySession = async (next: Session | null, fromInitial = false) => {
      if (!mounted) return;
      setSession(next);
      setUser(next?.user ?? null);

      const uid = next?.user?.id ?? null;
      if (uid !== lastCheckedUserIdRef.current) {
        lastCheckedUserIdRef.current = uid;
        if (uid) {
          const admin = await checkIsAdmin(uid);
          if (!mounted) return;
          // Guard against stale resolution if user changed during await
          if (lastCheckedUserIdRef.current === uid) {
            setIsAdmin(admin);
          }
        } else {
          setIsAdmin(false);
        }
      }

      if (fromInitial || initialDone) {
        initialDone = true;
        if (mounted) setIsLoading(false);
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      // Defer Supabase calls outside the callback to avoid deadlocks
      setTimeout(() => {
        void applySession(nextSession, false);
      }, 0);
    });

    supabase.auth.getSession().then(({ data }) => {
      void applySession(data.session, true);
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
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
