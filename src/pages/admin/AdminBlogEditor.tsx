import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Eye, Loader2, Trash2, X } from "lucide-react";
import type { ValidationOk } from "@/lib/admin/importArticle";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ArticlePreviewModal from "@/components/admin/ArticlePreviewModal";
import ImageUploader from "@/components/admin/ImageUploader";
import MarkdownToolbar from "@/components/admin/MarkdownToolbar";
import MarkdownSyntaxHelp from "@/components/admin/MarkdownSyntaxHelp";
import SeoPreview from "@/components/admin/SeoPreview";
import UnsavedChangesPrompt from "@/components/admin/UnsavedChangesPrompt";

import { blogPostSchema, type BlogPostFormValues } from "@/lib/admin/blogPostSchema";
import { slugify } from "@/lib/blogHelpers";
import { cn } from "@/lib/utils";

import { useBlogAuthors } from "@/hooks/blog/useBlogAuthors";
import { useBlogCategories } from "@/hooks/blog/useBlogCategories";
import { useAdminBlogPost } from "@/hooks/admin/useAdminBlogPost";
import { useCreateBlogPost } from "@/hooks/admin/useCreateBlogPost";
import { useUpdateBlogPost } from "@/hooks/admin/useUpdateBlogPost";
import { useDeleteBlogPost } from "@/hooks/admin/useDeleteBlogPost";
import { slugExists } from "@/hooks/admin/useSlugExists";

const emptyDefaults: BlogPostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content_md: "",
  cover_image_url: null,
  hero_image_url: null,
  author_id: "",
  category_id: "",
  status: "draft",
  featured_on_home: false,
  meta_title: "",
  meta_description: "",
};

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const location = useLocation();
  const importedPayload = (location.state as { imported?: ValidationOk } | null)?.imported ?? null;

  const { data: existing, isLoading: loadingPost } = useAdminBlogPost(id);
  const { data: authors } = useBlogAuthors();
  const { data: categories } = useBlogCategories();
  const createMut = useCreateBlogPost();
  const updateMut = useUpdateBlogPost();
  const deleteMut = useDeleteBlogPost();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const slugManuallyEditedRef = useRef(false);
  const importAppliedRef = useRef(false);
  const [topError, setTopError] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [importBanner, setImportBanner] = useState<{ slugRegenerated: boolean } | null>(null);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: emptyDefaults,
    mode: "onSubmit",
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = form;

  // Hydrate form on edit
  useEffect(() => {
    if (existing) {
      slugManuallyEditedRef.current = true; // existing slug is "manual"
      reset({
        title: existing.title,
        slug: existing.slug,
        excerpt: existing.excerpt,
        content_md: existing.contentMd,
        cover_image_url: existing.coverImageUrl,
        hero_image_url: existing.heroImageUrl,
        author_id: existing.author?.id ?? "",
        category_id: existing.category?.id ?? "",
        status: existing.status,
        featured_on_home: existing.featuredOnHome,
        meta_title: existing.metaTitle ?? "",
        meta_description: existing.metaDescription ?? "",
      });
    }
  }, [existing, reset]);

  // Default author/category once loaded for create mode
  useEffect(() => {
    if (isEdit) return;
    if (!form.getValues("author_id") && authors?.[0]) {
      setValue("author_id", authors[0].id);
    }
    if (!form.getValues("category_id") && categories?.[0]) {
      setValue("category_id", categories[0].id);
    }
  }, [authors, categories, isEdit, setValue, form]);

  const titleValue = watch("title");
  const slugValue = watch("slug");
  const excerptValue = watch("excerpt");
  const contentValue = watch("content_md");
  const metaTitleValue = watch("meta_title");
  const metaDescValue = watch("meta_description");
  const statusValue = watch("status");

  // Auto-sync slug from title until user edits it
  useEffect(() => {
    if (slugManuallyEditedRef.current) return;
    setValue("slug", slugify(titleValue || ""), { shouldDirty: true });
  }, [titleValue, setValue]);

  const submit = async (values: BlogPostFormValues, intendedStatus?: "draft" | "published") => {
    setTopError(null);
    const finalValues: BlogPostFormValues = {
      ...values,
      status: intendedStatus ?? values.status,
    };

    // Slug uniqueness
    const taken = await slugExists(finalValues.slug, id);
    if (taken) {
      form.setError("slug", { message: "Ce slug est déjà utilisé par un autre article" });
      return;
    }

    // Slug change warning on published post
    if (isEdit && existing?.status === "published" && existing.slug !== finalValues.slug) {
      const ok = window.confirm(
        "Modifier le slug d'un article publié change son URL et peut casser les liens existants ainsi que le référencement. Continuer ?",
      );
      if (!ok) return;
    }

    try {
      if (isEdit && id) {
        const updated = await updateMut.mutateAsync({
          id,
          values: finalValues,
          previousSlug: existing?.slug,
        });
        if (existing?.status !== "published" && updated.status === "published") {
          toast.success("Article publié");
        } else if (existing?.status === "published" && updated.status === "draft") {
          toast.success("Article remis en brouillon");
        } else {
          toast.success("Modifications enregistrées");
        }
        reset(finalValues, { keepValues: true });
      } else {
        await createMut.mutateAsync(finalValues);
        toast.success(finalValues.status === "published" ? "Article publié" : "Article créé");
        navigate("/admin/blog");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setTopError(msg);
      toast.error("Une erreur s'est produite. Réessaie ou contacte le support.");
    }
  };

  const onCancel = () => {
    if (isDirty && !window.confirm("Quitter sans enregistrer les modifications ?")) return;
    navigate("/admin/blog");
  };

  const handleDelete = async () => {
    if (!id || !existing) return;
    try {
      await deleteMut.mutateAsync({ id, slug: existing.slug });
      toast.success("Article supprimé");
      navigate("/admin/blog");
    } catch {
      toast.error("Une erreur s'est produite. Réessaie ou contacte le support.");
    }
  };

  const excerptCount = excerptValue?.length ?? 0;
  const metaTitleCount = metaTitleValue?.length ?? 0;
  const metaDescCount = metaDescValue?.length ?? 0;

  const submitting = isSubmitting || createMut.isPending || updateMut.isPending;
  const errorList = useMemo(() => Object.values(errors).map((e) => e?.message).filter(Boolean), [errors]);

  if (isEdit && loadingPost) {
    return <p className="text-muted-foreground font-body">Chargement…</p>;
  }
  if (isEdit && !loadingPost && !existing) {
    return (
      <div className="space-y-3">
        <p className="font-body">Article introuvable.</p>
        <Button asChild variant="outline">
          <Link to="/admin/blog">Retour à la liste</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((v) => submit(v))} className="space-y-6 pb-32 font-body">
      <UnsavedChangesPrompt when={isDirty} />

      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <h1 className="font-display text-3xl text-foreground">
          {isEdit ? "Modifier l'article" : "Nouvel article"}
        </h1>
      </div>

      {(topError || errorList.length > 0) && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {topError && <p className="font-medium">{topError}</p>}
          {errorList.length > 0 && (
            <ul className="list-disc pl-4 mt-1 text-xs">
              {errorList.map((m, i) => (
                <li key={i}>{m as string}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* LEFT */}
        <div className="space-y-6 min-w-0">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" {...register("title")} placeholder="Titre de l'article" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register("slug", {
                onChange: () => {
                  slugManuallyEditedRef.current = true;
                },
              })}
              placeholder="url-de-l-article"
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Génération auto depuis le titre. Modifier pour personnaliser.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Résumé</Label>
            <Textarea id="excerpt" {...register("excerpt")} rows={3} />
            <p
              className={cn(
                "text-xs text-right",
                excerptCount > 220 ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {excerptCount}/220
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label>Contenu</Label>
              <div className="flex items-center gap-3">
                <MarkdownSyntaxHelp />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewModalOpen(true)}
                >
                  <Eye className="h-4 w-4" />
                  Aperçu de l'article
                </Button>
              </div>
            </div>

            <Controller
              control={control}
              name="content_md"
              render={({ field }) => (
                <div className="min-w-0">
                  <MarkdownToolbar
                    textareaRef={textareaRef}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <Textarea
                    ref={(el) => {
                      textareaRef.current = el;
                      field.ref(el);
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    onKeyDown={(e) => {
                      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "p") {
                        e.preventDefault();
                        setPreviewModalOpen(true);
                      }
                    }}
                    className="min-h-[500px] font-mono text-sm rounded-t-none w-full"
                  />
                </div>
              )}
            />
          </div>
        </div>

        {/* RIGHT */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-2">
            <Label>Statut</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <div className="inline-flex p-0.5 rounded-md bg-muted border border-border/60 w-full">
                  {(["draft", "published"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => field.onChange(s)}
                      className={cn(
                        "flex-1 px-3 py-1.5 text-xs rounded-sm transition-colors",
                        field.value === s
                          ? "bg-white text-foreground shadow-sm font-medium"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {s === "draft" ? "Brouillon" : "Publié"}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="featured">À la une</Label>
              <Controller
                control={control}
                name="featured_on_home"
                render={({ field }) => (
                  <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Décoche automatiquement l'article actuellement à la une.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Auteur</Label>
            <Controller
              control={control}
              name="author_id"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors?.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: a.gradientFrom }}
                          />
                          {a.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Controller
              control={control}
              name="category_id"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: c.color }}
                          />
                          {c.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Image de couverture</Label>
            <Controller
              control={control}
              name="cover_image_url"
              render={({ field }) => (
                <ImageUploader
                  value={field.value ?? null}
                  onChange={field.onChange}
                  folder="covers"
                  postId={id}
                  helperText="Affichée en haut de l'article et dans les listings."
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Image hero (optionnelle)</Label>
            <Controller
              control={control}
              name="hero_image_url"
              render={({ field }) => (
                <ImageUploader
                  value={field.value ?? null}
                  onChange={field.onChange}
                  folder="heroes"
                  postId={id}
                  helperText="Image alternative pour la mise en avant accueil. Vide = utilise la cover."
                />
              )}
            />
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="seo">
              <AccordionTrigger className="text-sm">SEO</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="meta_title">Meta titre</Label>
                  <Input id="meta_title" {...register("meta_title")} />
                  <p
                    className={cn(
                      "text-xs text-right",
                      metaTitleCount > 70 ? "text-destructive" : "text-muted-foreground",
                    )}
                  >
                    {metaTitleCount}/70 — vide = titre de l'article
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="meta_description">Meta description</Label>
                  <Textarea id="meta_description" {...register("meta_description")} rows={3} />
                  <p
                    className={cn(
                      "text-xs text-right",
                      metaDescCount > 160 ? "text-destructive" : "text-muted-foreground",
                    )}
                  >
                    {metaDescCount}/160 — vide = résumé
                  </p>
                </div>
                <SeoPreview
                  title={titleValue}
                  excerpt={excerptValue}
                  metaTitle={metaTitleValue}
                  metaDescription={metaDescValue}
                  slug={slugValue}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
      </div>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border/60 bg-[#FCFAF7]/95 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
          {isEdit ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer cet article&nbsp;?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Annuler
            </Button>
          )}

          <div className="flex items-center gap-2">
            {!isEdit && (
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                onClick={handleSubmit((v) => submit(v, "draft"))}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Enregistrer en brouillon
              </Button>
            )}
            <Button
              type="button"
              disabled={submitting}
              onClick={handleSubmit((v) => submit(v, isEdit ? statusValue : "published"))}
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Mettre à jour" : "Publier"}
            </Button>
          </div>
        </div>
      </div>

      <ArticlePreviewModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        formValues={form.getValues()}
        authors={authors ?? []}
        categories={categories ?? []}
      />
    </form>
  );
};

export default AdminBlogEditor;
