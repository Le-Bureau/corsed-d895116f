interface Props {
  title: string;
  excerpt: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug: string;
}

const SeoPreview = ({ title, excerpt, metaTitle, metaDescription, slug }: Props) => {
  const baseTitle = metaTitle?.trim() || title || "Titre de l'article";
  const displayedTitle = (
    baseTitle.includes("Corse Drone") ? baseTitle : `${baseTitle} | Corse Drone`
  ).slice(0, 70);
  const displayedDesc = (metaDescription?.trim() || excerpt || "Résumé de l'article…").slice(0, 160);
  const url = `corse-drone.com › blog › ${slug || "url-de-l-article"}`;

  return (
    <div className="rounded-md border border-border/60 bg-white p-3 space-y-1 font-body">
      <p className="text-xs truncate" style={{ color: "#006621" }}>{url}</p>
      <p
        className="text-base leading-snug truncate"
        style={{ color: "#1a0dab", fontFamily: "Arial, sans-serif" }}
      >
        {displayedTitle}
      </p>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
        {displayedDesc}
      </p>
    </div>
  );
};

export default SeoPreview;
