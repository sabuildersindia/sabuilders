import { ArrowUpRight, HardHat, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../context/I18nContext";
import ToggleSwitch from "./ToggleSwitch";

export default function Header(){
  const {lang,setLang,theme,setTheme,t}=useI18n();
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const on=()=>setScrolled(window.scrollY>10);on();window.addEventListener('scroll',on,{passive:true});return()=>window.removeEventListener('scroll',on)},[]);
  const nav=[['/',t.nav.home],['/about',t.nav.about],['/services',t.nav.services],['/projects',t.nav.projects],['/process',t.nav.process],['/contact',t.nav.contact]];
  return <header className={`nav${scrolled||open?' scrolled':''}`}>
    <div className="container nav-inner">
      <NavLink to="/" className="brand" onClick={()=>setOpen(false)}>
        <span className="brand-mark"><HardHat size={19}/></span>
        <span>{t.brand}<small>{t.subbrand}</small></span>
      </NavLink>

      <nav className={open?'nav-links open':'nav-links'}>
        {nav.map(([to,label])=><NavLink key={to} to={to} end={to==="/"} onClick={()=>setOpen(false)}>{label}</NavLink>)}
        <NavLink className="nav-cta" to="/contact" onClick={()=>setOpen(false)}>{t.nav.start}<ArrowUpRight size={16}/></NavLink>
        <ToggleSwitch
          checked={lang==='ta'}
          onChange={on=>setLang(on?'ta':'en')}
          left="EN" right="தமிழ்"
          label="Language"
        />
        <ToggleSwitch
          checked={theme==='dark'}
          onChange={on=>setTheme(on?'dark':'light')}
          left={<Sun size={14}/>} right={<Moon size={14}/>}
          label={theme==='light'?t.toggles.dark:t.toggles.light}
        />
      </nav>
      <button className="menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
    </div>
  </header>;
}
