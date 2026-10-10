import { CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero";
import { useI18n } from "../context/I18nContext";
export default function About(){const {t}=useI18n();return <><PageHero label={t.about.label} title={t.about.title} desc={t.about.lead}/><section className="section"><div className="container about-layout"><div className="about-image"><img src="https://images.unsplash.com/photo-1660367439240-d38cb03a4365?auto=format&fit=crop&w=1200&q=85" alt="Construction site"/></div><div><p className="lead">{t.about.lead}</p><p>{t.about.body}</p><div className="ticks">{t.about.ticks.map(x=><span key={x}><CheckCircle2/>{x}</span>)}</div></div></div></section></>}
