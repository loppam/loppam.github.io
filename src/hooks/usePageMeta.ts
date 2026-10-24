import { useEffect } from "react";

type PageMeta = { url?: string; image?: string; imageAlt?: string; noindex?: boolean };

export function usePageMeta(title: string, description: string, options: PageMeta = {}) {
  const { url = "https://lopam.pario.la/", image, imageAlt, noindex = false } = options;
  useEffect(() => {
    document.title = title;
    const fields = [
      ["name", "description", description],
      ["name", "robots", noindex ? "noindex, nofollow" : "index, follow"],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["property", "og:image", image],
      ["property", "og:image:alt", imageAlt],
      ["property", "og:image:width", image ? "1200" : undefined],
      ["property", "og:image:height", image ? "630" : undefined],
      ["name", "twitter:card", image ? "summary_large_image" : "summary"],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
      ["name", "twitter:image", image],
      ["name", "twitter:image:alt", imageAlt],
    ];
    for (const [attribute, key, value] of fields) {
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!value) { tag?.remove(); continue; }
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute!, key!);
        document.head.appendChild(tag);
      }
      tag.content = value;
    }
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, url, image, imageAlt, noindex]);
}
