import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "../data";
import { useI18n } from "../context/I18nContext";
export default function ServiceGrid(){const {t,lang}=useI18n();return <div className="service-grid">{services.map(({icon:Icon,title,text},i)=><article className="service" key={title.en}><div className="service-num">0{i+1}</div><Icon size={30}/><h3>{title[lang]}</h3><p>{text[lang]}</p><Link to="/contact">{t.nav.contact}<ArrowUpRight size={15}/></Link></article>)}</div>}
