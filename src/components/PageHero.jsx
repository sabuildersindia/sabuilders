import { useLocation } from "react-router-dom";

// Each page gets its own colour via a class like "ph-about" (see styles.css)
export default function PageHero({ label, title, desc }) {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[1] || "home";
  return <section className={`page-hero ph-${slug}`}><div className="container"><div className="section-label">{label}</div><h1>{title}</h1>{desc && <p>{desc}</p>}</div></section>;
}
