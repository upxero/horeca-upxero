import { useEffect } from "react";

export const useSEO = ({
  title,
  description,
  canonical,
  structuredData,
}) => {
  useEffect(() => {
    /* ===== TITLE ===== */
    if (title) {
      document.title = title;
    }

    /* ===== META DESCRIPTION ===== */
    if (description) {
      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    /* ===== CANONICAL ===== */
    if (canonical) {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    /* ===== OPEN GRAPH ===== */
    const setOG = (property, content) => {
      if (!content) return;
      let meta = document.querySelector(`meta[property='${property}']`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setOG("og:title", title);
    setOG("og:description", description);
    setOG("og:url", canonical);
    setOG("og:type", "website");

    /* ===== TWITTER ===== */
    const setTwitter = (name, content) => {
      if (!content) return;
      let meta = document.querySelector(`meta[name='${name}']`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setTwitter("twitter:card", "summary_large_image");
    setTwitter("twitter:title", title);
    setTwitter("twitter:description", description);

    /* ===== STRUCTURED DATA ===== */
    let script;
    if (structuredData) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    /* ===== CLEANUP ===== */
    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [title, description, canonical, structuredData]);
};
