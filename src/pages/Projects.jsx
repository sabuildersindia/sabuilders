import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import { projects } from "../data";
import { useI18n } from "../context/I18nContext";
export default function Projects(){const {t,lang}=useI18n();return <><PageHero label={t.projects.label} title={t.projects.title} desc={t.projects.desc}/><section className="section projects"><div className="container project-grid">{projects.map((p,i)=><article className={'project p'+i} key={p.title.en}><img src={p.image} alt={p.title[lang]}/><div className="project-overlay"><span>{p.type[lang]} · {p.year}</span><h3>{p.title[lang]}</h3><small><MapPin size={13}/>{p.location[lang]}</small></div></article>)}</div><div className="container more-projects"><Link className="btn primary" to="/gallery">{t.projects.more}<ArrowUpRight size={18}/></Link></div></section></>}
