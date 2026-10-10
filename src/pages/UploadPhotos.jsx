import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import PageHero from "../components/PageHero";
import { useI18n } from "../context/I18nContext";
import usePhotos from "../lib/usePhotos";
import { addPhoto, removePhoto, resizeImage } from "../lib/photoStore";

// Hidden page: reachable only by typing /upload in the address bar (no links point here)
export default function UploadPhotos() {
  const { t } = useI18n();
  const g = t.gallery;
  const { uploads, reload } = usePhotos();
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const input = useRef(null);

  async function handleFiles(files) {
    const list = [...files].filter(f => f.type.startsWith("image/"));
    if (!list.length) return;
    setBusy(true);
    for (const f of list) {
      try {
        const blob = await resizeImage(f);
        await addPhoto({ id: crypto.randomUUID(), blob, caption: f.name.replace(/\.[^.]+$/, ""), added: Date.now() });
      } catch { /* skip unreadable file */ }
    }
    await reload();
    setBusy(false);
  }

  async function del(id) {
    if (!window.confirm(g.confirm)) return;
    await removePhoto(id);
    reload();
  }

  return <>
    <PageHero label={g.uploadLabel} title={g.uploadTitle} desc={g.uploadDesc} />
    <section className="section gallery">
      <div className="container">
        <div
          className={"dropzone" + (drag ? " drag" : "")}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
        >
          <ImagePlus size={28} />
          <div><b>{busy ? g.uploading : g.drop}</b><p>{g.hint}</p></div>
          <button className="btn primary" onClick={() => input.current.click()} disabled={busy}>{g.upload}</button>
          <input ref={input} type="file" accept="image/*" multiple hidden onChange={e => { handleFiles(e.target.files); e.target.value = ""; }} />
        </div>

        {uploads.length === 0
          ? <p className="upload-empty">{g.empty}</p>
          : <div className="upload-grid">
              {uploads.map(p => (
                <figure className="upload-item" key={p.id}>
                  <img src={p.src} alt={p.caption} />
                  <figcaption>{p.caption}</figcaption>
                  <button className="upload-del" aria-label={g.delete} onClick={() => del(p.id)}><Trash2 size={15} /></button>
                </figure>
              ))}
            </div>}
      </div>
    </section>
  </>;
}
