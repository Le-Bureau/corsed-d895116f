declare global {
  interface Window {
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string | number | boolean | null | undefined> },
    ) => void;
  }
}

interface TrackEventProps {
  [key: string]: string | number | boolean | null | undefined;
}

export const trackEvent = (name: string, props?: TrackEventProps): void => {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.plausible !== "function") return; // adblocker or not loaded

    const cleanProps = props
      ? Object.fromEntries(
          Object.entries(props).filter(([, v]) => v !== undefined && v !== null),
        )
      : undefined;

    window.plausible(
      name,
      cleanProps && Object.keys(cleanProps).length > 0 ? { props: cleanProps } : undefined,
    );
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("[analytics] trackEvent failed:", error);
    }
  }
};

export const Events = {
  ARTICLE_VIEWED: "Article viewed",
  ARTICLE_SHARED: "Article shared",
  CATEGORY_FILTER: "Category filter",
  SEARCH_PERFORMED: "Search performed",
  RELATED_ARTICLE_CLICKED: "Related article clicked",
  ARTICLE_CTA_CLICKED: "Article CTA clicked",
  NEWSLETTER_INTEREST: "Newsletter interest",
} as const;
