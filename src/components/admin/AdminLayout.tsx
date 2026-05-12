import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoFullOnLight from "@/assets/logo-mcg-full-onlight.svg";

interface AdminAuthorMeta {
  initials: string;
  name: string;
  gradientFrom: string;
  gradientTo: string;
}

const navItems = [
  { to: "/admin", label: "Tableau de bord", end: true },
  { to: "/admin/blog", label: "Blog", end: false },
];

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<AdminAuthorMeta | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    supabase
      .from("blog_authors")
      .select("initials, name, gradient_from, gradient_to")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data) return;
        setAuthor({
          initials: data.initials,
          name: data.name,
          gradientFrom: data.gradient_from,
          gradientTo: data.gradient_to,
        });
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const fallbackInitials = (user?.email ?? "?").slice(0, 2).toUpperCase();
  const initials = author?.initials ?? fallbackInitials;
  const displayName = author?.name ?? user?.email ?? "";

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col">
      <header className="border-b border-border/50 bg-[#FCFAF7]/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="flex items-center h-7" aria-label="Admin — Accueil">
              <img src={logoFullOnLight} alt="Corse Drone" className="h-full w-auto" />
            </Link>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-[0.15em] font-body">
              Admin
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1 font-body">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Menu utilisateur"
              >
                <span
                  className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-semibold font-body shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${author?.gradientFrom ?? "#5082AC"}, ${author?.gradientTo ?? "#3F6A8E"})`,
                  }}
                >
                  {initials}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 font-body">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium truncate">{displayName}</p>
                  {user?.email && displayName !== user.email && (
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <ExternalLink className="h-4 w-4" />
                    Voir le site
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
