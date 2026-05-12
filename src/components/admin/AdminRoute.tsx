import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas accès à cette zone.",
        variant: "destructive",
      });
    }
  }, [isLoading, user, isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-8 w-8 rounded-full border-2 border-muted border-t-primary animate-spin"
            role="status"
            aria-label="Chargement"
          />
          <p className="text-sm text-muted-foreground">Chargement…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/admin/login?redirect=${redirect}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
