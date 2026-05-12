import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Camera } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminBlogPosts } from "@/hooks/admin/useAdminBlogPosts";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data: posts } = useAdminBlogPosts();
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    supabase
      .from("blog_authors")
      .select("name")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        if (data?.name) {
          setFirstName(data.name.split(" ")[0]);
        } else if (user.email) {
          setFirstName(user.email.split("@")[0]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const greetingName = firstName ?? user?.email?.split("@")[0] ?? "";
  const publishedCount = posts?.filter((p) => p.status === "published").length ?? 0;
  const draftCount = posts?.filter((p) => p.status === "draft").length ?? 0;

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="font-display text-4xl md:text-5xl text-foreground">
          Bonjour{greetingName ? `, ${greetingName}` : ""}
        </h1>
        <p className="text-muted-foreground font-body text-lg">
          Voici ce que vous pouvez gérer ici.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DashboardCard
          icon={<BookOpen className="h-5 w-5" />}
          title="Articles du blog"
          description="Créer, modifier, publier vos articles."
          meta={`${publishedCount} publié${publishedCount > 1 ? "s" : ""} · ${draftCount} brouillon${draftCount > 1 ? "s" : ""}`}
          ctaLabel="Gérer le blog"
          to="/admin/blog"
        />
        <DashboardCard
          icon={<Camera className="h-5 w-5" />}
          title="Réalisations"
          description="Mettre en avant vos projets et études de cas."
          meta="Bientôt disponible"
          disabled
        />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  meta: string;
  ctaLabel?: string;
  to?: string;
  disabled?: boolean;
}

const DashboardCard = ({ icon, title, description, meta, ctaLabel, to, disabled }: DashboardCardProps) => {
  const inner = (
    <div
      className={cn(
        "h-full rounded-xl border border-border/60 bg-white p-6 flex flex-col gap-4 transition-all",
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center",
            disabled ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary",
          )}
        >
          {icon}
        </span>
        <h2 className="font-display text-xl text-foreground">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground font-body flex-1">{description}</p>
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <span className="text-xs text-muted-foreground font-body">{meta}</span>
        {ctaLabel && !disabled && (
          <span className="text-sm font-medium text-primary inline-flex items-center gap-1 font-body">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  );

  if (disabled || !to) return inner;
  return (
    <Link to={to} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
      {inner}
    </Link>
  );
};

export default AdminDashboard;
