import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import ImageUploader from "@/components/admin/ImageUploader";
import UnsavedChangesPrompt from "@/components/admin/UnsavedChangesPrompt";
import BlogAuthorBio from "@/components/blog/BlogAuthorBio";

import { useCurrentAuthor } from "@/hooks/admin/useCurrentAuthor";
import { useUpdateCurrentAuthor } from "@/hooks/admin/useUpdateCurrentAuthor";
import { supabase } from "@/integrations/supabase/client";

const profileSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(80, "80 caractères max"),
  initials: z
    .string()
    .trim()
    .min(1, "Initiales requises")
    .max(3, "3 caractères max")
    .regex(/^[A-Z]+$/, "Lettres majuscules uniquement"),
  role: z.string().trim().min(1, "Rôle requis").max(80, "80 caractères max"),
  bio: z.string().trim().max(500, "500 caractères max").optional().or(z.literal("")),
  avatar_url: z.string().nullable(),
  gradient_from: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Couleur hex invalide"),
  gradient_to: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Couleur hex invalide"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface Swatch {
  name: string;
  from: string;
  to: string;
}

const SWATCHES: Swatch[] = [
  { name: "Bleu", from: "#5082AC", to: "#3F6A8E" },
  { name: "Vert", from: "#16A34A", to: "#15803D" },
  { name: "Violet", from: "#8B5CF6", to: "#7C3AED" },
  { name: "Orange", from: "#F59E0B", to: "#D97706" },
  { name: "Rose", from: "#EC4899", to: "#BE185D" },
  { name: "Cyan", from: "#14B8A6", to: "#0F766E" },
];

const isPresetMatch = (from: string, to: string) =>
  SWATCHES.some(
    (s) => s.from.toLowerCase() === from.toLowerCase() && s.to.toLowerCase() === to.toLowerCase(),
  );

const AdminProfile = () => {
  const navigate = useNavigate();
  const { data: author, isLoading } = useCurrentAuthor();
  const updateMut = useUpdateCurrentAuthor();
  const [customGradient, setCustomGradient] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      initials: "",
      role: "",
      bio: "",
      avatar_url: null,
      gradient_from: "#5082AC",
      gradient_to: "#3F6A8E",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = form;

  useEffect(() => {
    if (author) {
      reset({
        name: author.name,
        initials: author.initials,
        role: author.role,
        bio: author.bio ?? "",
        avatar_url: author.avatarUrl,
        gradient_from: author.gradientFrom,
        gradient_to: author.gradientTo,
      });
      setCustomGradient(!isPresetMatch(author.gradientFrom, author.gradientTo));
    }
  }, [author, reset]);

  const values = watch();
  const bioCount = values.bio?.length ?? 0;

  const publishedQuery = useQuery({
    queryKey: ["admin", "author", "published-count", author?.id],
    enabled: !!author?.id,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("author_id", author!.id)
        .eq("status", "published");
      if (error) throw error;
      return count ?? 0;
    },
  });

  const previewAuthor = useMemo(
    () => ({
      id: author?.id ?? "preview",
      name: values.name || "(Sans nom)",
      role: values.role || "",
      initials: (values.initials || "?").toUpperCase(),
      bio: values.bio?.trim() ? values.bio.trim() : null,
      avatarUrl: values.avatar_url,
      gradientFrom: values.gradient_from,
      gradientTo: values.gradient_to,
      sortOrder: author?.sortOrder ?? 0,
    }),
    [values, author],
  );

  const onSubmit = async (v: ProfileFormValues) => {
    await updateMut.mutateAsync({
      name: v.name.trim(),
      initials: v.initials.toUpperCase(),
      role: v.role.trim(),
      bio: v.bio?.trim() ? v.bio.trim() : null,
      avatar_url: v.avatar_url,
      gradient_from: v.gradient_from,
      gradient_to: v.gradient_to,
    });
    reset(v);
  };

  const onCancel = () => {
    if (isDirty && !window.confirm("Quitter sans enregistrer les modifications ?")) return;
    navigate("/admin");
  };

  if (isLoading) {
    return <p className="text-muted-foreground font-body">Chargement…</p>;
  }

  if (!author) {
    return (
      <div className="max-w-xl space-y-4 font-body">
        <h1 className="font-display text-3xl text-foreground">Mon profil</h1>
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Votre profil auteur n'est pas encore configuré. Demandez à l'administrateur de lier
          votre compte à un profil d'auteur dans Supabase.
        </div>
        <Button asChild variant="outline">
          <Link to="/admin">Retour au tableau de bord</Link>
        </Button>
      </div>
    );
  }

  const submitting = isSubmitting || updateMut.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-32 font-body">
      <UnsavedChangesPrompt when={isDirty} />

      <header className="space-y-1">
        <h1 className="font-display text-3xl text-foreground">Mon profil</h1>
        <p className="text-muted-foreground text-sm">
          Ces informations apparaissent en bas de chaque article que vous publiez.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* LEFT */}
        <div className="space-y-6 min-w-0">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" {...register("name")} maxLength={80} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="initials">Initiales</Label>
            <Input
              id="initials"
              {...register("initials", {
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase().slice(0, 3);
                },
              })}
              maxLength={3}
              className="uppercase font-mono w-24"
            />
            <p className="text-xs text-muted-foreground">
              Affichées dans l'avatar quand il n'y a pas d'image.
            </p>
            {errors.initials && (
              <p className="text-xs text-destructive">{errors.initials.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Input id="role" {...register("role")} maxLength={80} placeholder="Fondateur & pilote drone" />
            {errors.role && (
              <p className="text-xs text-destructive">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" {...register("bio")} rows={5} maxLength={500} />
            <p
              className={cn(
                "text-xs text-right",
                bioCount > 500 ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {bioCount}/500
            </p>
          </div>

          <div className="space-y-2">
            <Label>Avatar</Label>
            <Controller
              control={control}
              name="avatar_url"
              render={({ field }) => (
                <div className="max-w-xs">
                  <ImageUploader
                    value={field.value ?? null}
                    onChange={field.onChange}
                    folder="avatars"
                    postId={author.id}
                    helperText="Carrée recommandée, JPG/PNG/WEBP, max 5 Mo."
                  />
                </div>
              )}
            />
          </div>

          <div className="space-y-3">
            <div>
              <Label>Couleur de l'avatar</Label>
              <p className="text-xs text-muted-foreground">
                Si vous n'avez pas d'avatar, ces couleurs sont utilisées pour le fond du cercle
                d'initiales.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {SWATCHES.map((s) => {
                const selected =
                  !customGradient &&
                  values.gradient_from.toLowerCase() === s.from.toLowerCase() &&
                  values.gradient_to.toLowerCase() === s.to.toLowerCase();
                return (
                  <button
                    key={s.name}
                    type="button"
                    title={s.name}
                    aria-label={s.name}
                    onClick={() => {
                      setCustomGradient(false);
                      setValue("gradient_from", s.from, { shouldDirty: true });
                      setValue("gradient_to", s.to, { shouldDirty: true });
                    }}
                    className={cn(
                      "h-10 w-10 rounded-full transition-all",
                      selected
                        ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                        : "ring-1 ring-border hover:scale-105",
                    )}
                    style={{
                      background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
                    }}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="custom-gradient" className="text-sm">
                Personnalisé
              </Label>
              <Switch
                id="custom-gradient"
                checked={customGradient}
                onCheckedChange={setCustomGradient}
              />
            </div>

            {customGradient && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <Label htmlFor="gradient_from" className="text-xs">
                    Couleur de départ
                  </Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={values.gradient_from}
                      onChange={(e) =>
                        setValue("gradient_from", e.target.value, { shouldDirty: true })
                      }
                      className="h-9 w-12 rounded border border-border cursor-pointer"
                    />
                    <Input
                      id="gradient_from"
                      {...register("gradient_from")}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="gradient_to" className="text-xs">
                    Couleur de fin
                  </Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={values.gradient_to}
                      onChange={(e) =>
                        setValue("gradient_to", e.target.value, { shouldDirty: true })
                      }
                      className="h-9 w-12 rounded border border-border cursor-pointer"
                    />
                    <Input
                      id="gradient_to"
                      {...register("gradient_to")}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Aperçu de l'avatar
            </Label>
            <div className="rounded-lg border border-border/60 bg-white p-6 flex justify-center">
              {previewAuthor.avatarUrl ? (
                <img
                  src={previewAuthor.avatarUrl}
                  alt="Avatar"
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />
              ) : (
                <span
                  className="h-[60px] w-[60px] rounded-full flex items-center justify-center text-white text-xl font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${previewAuthor.gradientFrom}, ${previewAuthor.gradientTo})`,
                  }}
                >
                  {previewAuthor.initials}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Aperçu de la signature
            </Label>
            <div className="blog-scope rounded-lg border border-border/60 bg-white p-4">
              <BlogAuthorBio author={previewAuthor} />
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-white p-4 space-y-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Statistiques</p>
            <p className="text-2xl font-display text-foreground">
              {publishedQuery.data ?? "…"}
            </p>
            <p className="text-xs text-muted-foreground">
              article{(publishedQuery.data ?? 0) > 1 ? "s" : ""} publié
              {(publishedQuery.data ?? 0) > 1 ? "s" : ""}
            </p>
            <Link
              to="/admin/blog"
              className="inline-block text-sm text-primary hover:underline pt-1"
            >
              Voir mes articles →
            </Link>
          </div>
        </aside>
      </div>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border/60 bg-[#FCFAF7]/95 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" disabled={submitting || !isDirty}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Enregistrer
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AdminProfile;
