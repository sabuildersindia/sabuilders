import PageHero from "../components/PageHero";
import ServiceGrid from "../components/ServiceGrid";
import { useI18n } from "../context/I18nContext";
export default function Services(){const {t}=useI18n();return <><PageHero label={t.services.label} title={t.services.title} desc={t.services.desc}/><section className="section dark"><div className="container"><ServiceGrid/></div></section></>}
