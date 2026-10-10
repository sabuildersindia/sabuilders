import { Ruler, ShieldCheck } from "lucide-react";
import PageHero from "../components/PageHero";
import { useI18n } from "../context/I18nContext";
export default function Process(){const {t}=useI18n();return <><PageHero label={t.process.label} title={t.process.title}/><section className="section process"><div className="container"><div className="process-grid">{t.process.steps.map((s,i)=><div className="step" key={s}><span>0{i+1}</span><Ruler size={22}/><h3>{s}</h3><p>{t.process.descs[i]}</p></div>)}</div></div></section><section className="quote-band"><div className="container quote-inner"><ShieldCheck size={42}/><div><blockquote>“{t.quote}”</blockquote><span>{t.principle}</span></div></div></section></>}
