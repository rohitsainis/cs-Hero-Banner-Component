export type HeroBannerViewModel = {
  title: string;
  subtitle?: string;
  descriptionHtml?: string;
  backgroundImageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export function mapHeroBannerEntryToViewModel(entry: any): HeroBannerViewModel {
  if (!entry) {
    return {
      title: "",
      subtitle: "",
      descriptionHtml: "",
      backgroundImageUrl: "",
      backgroundColor: "#001f3f",
      textColor: "#ffffff",
      ctaLabel: "",
      ctaUrl: "#",
    };
  }

  return {
    title: entry.title || "",
    subtitle: entry.subtitle || "",
    descriptionHtml: entry.description || "", // rich text HTML from CMS
    backgroundImageUrl: entry.background_image?.url || "",
    backgroundColor: entry.background_color || "#001f3f",
    textColor: "#ffffff",
    ctaLabel: undefined,
    ctaUrl: undefined,
  };
}
