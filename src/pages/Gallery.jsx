import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHero from "../components/PageHero";
import { galleryPhotos } from "../data";
import { useI18n } from "../context/I18nContext";
import usePhotos from "../lib/usePhotos";

export default function Gallery() {
  const { t, lang } = useI18n();
  const g = t.gallery;
  const { uploads } = usePhotos();
  const [active, setActive] = useState(null);

  const items = [
    ...uploads,
    ...galleryPhotos.map((p, i) => ({ id: "seed" + i, src: p.src, caption: p.caption[lang] }))
  ];

  const step = useCallback(d => setActive(a => (a === null ? a : (a + d + items.length) % items.length)), [items.length]);
  useEffect(() => {
    if (active === null) return;
    const k = e => { if (e.key === "Escape") setActive(null); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [active, step]);

  const cur = active !== null ? items[active] : null;

  return <>
    <PageHero label={g.label} title={g.title} desc={g.desc} />
    <section className="section gallery">
      <div className="container">
        <div className="gallery-grid">
          {items.map((p, i) => (
            <figure className="gallery-item" key={p.id} style={{ animationDelay: Math.min(i, 8) * 70 + "ms" }} onClick={() => setActive(i)}>
              <img src={p.src} alt={p.caption} loading="lazy" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {cur && <div className="lightbox" onClick={() => setActive(null)}>
      <button className="lb-btn lb-close" aria-label="Close" onClick={() => setActive(null)}><X /></button>
      <button className="lb-btn lb-prev" aria-label="Previous" onClick={e => { e.stopPropagation(); step(-1); }}><ChevronLeft /></button>
      <figure onClick={e => e.stopPropagation()}>
        <img src={cur.src} alt={cur.caption} />
        <figcaption><span>{cur.caption} · {active + 1}/{items.length}</span></figcaption>
      </figure>
      <button className="lb-btn lb-next" aria-label="Next" onClick={e => { e.stopPropagation(); step(1); }}><ChevronRight /></button>
    </div>}
  </>;
}
