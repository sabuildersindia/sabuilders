import { Link } from "react-router-dom";
import { HardHat } from "lucide-react";
import { useI18n } from "../context/I18nContext";
export default function Footer(){const {t}=useI18n();return <footer><div className="container footer-grid"><Link to="/" className="brand footer-brand"><span className="brand-mark"><HardHat size={19}/></span><span>{t.brand}<small>{t.subbrand}</small></span></Link><p>{t.footer.tagline}</p><div className="footer-meta">{t.footer.rights}</div></div></footer>}
