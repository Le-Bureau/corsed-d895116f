import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import logoFullOnLight from "@/assets/logo-mcg-full-onlight.svg";

const translateAuthError = (msg: string): string => {
  if (/invalid login credentials/i.test(msg)) return "Identifiants incorrects.";
  if (/email not confirmed/i.test(msg)) return "Email non confirmé.";
  if (/rate limit/i.test(msg)) return "Trop de tentatives. Réessayez dans quelques minutes.";
  return msg;
};

const AdminLogin = () => {
  const { user, isAdmin, isLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isLoading && user && isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);
    const { error } = await signIn(email, password);
    if (error) {
      setErrorMsg(translateAuthError(error.message));
      setSubmitting(false);
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FCFAF7]">
      <header className="w-full border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center">
          <Link to="/" className="flex items-center h-8" aria-label="Retour à l'accueil">
            <img src={logoFullOnLight} alt="Corse Drone" className="h-full w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md border-border/60 shadow-sm">
          <CardHeader className="space-y-2 pb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">
              Espace administrateur
            </p>
            <h1 className="font-display text-3xl text-foreground">Connexion</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5 font-body" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={submitting}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-3 py-2"
                >
                  {errorMsg}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connexion…
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center pt-2">
                Accès réservé à l'équipe Corse Drone. Mot de passe oublié ? Contactez l'administrateur.
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminLogin;
