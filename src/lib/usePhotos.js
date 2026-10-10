import { useCallback, useEffect, useState } from "react";
import { getPhotos } from "./photoStore";

// Loads photos saved in this browser and exposes object-URLs for display
export default function usePhotos() {
  const [uploads, setUploads] = useState([]);
  const load = useCallback(async () => {
    try {
      const rows = await getPhotos();
      setUploads(rows.map(r => ({ id: r.id, src: URL.createObjectURL(r.blob), caption: r.caption })));
    } catch { setUploads([]); }
  }, []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => () => uploads.forEach(u => URL.revokeObjectURL(u.src)), [uploads]);
  return { uploads, reload: load };
}
