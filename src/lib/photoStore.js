// Browser-side photo storage (IndexedDB). Photos persist on this device/browser only.
const DB = 'terraforge-gallery';
const STORE = 'photos';

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id' });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function run(mode, fn) {
  return open().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const res = fn(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(res.result);
    tx.onerror = () => reject(tx.error);
  }));
}
export const getPhotos = () => run('readonly', s => s.getAll()).then(r => (r || []).sort((a, b) => b.added - a.added));
export const addPhoto = p => run('readwrite', s => s.put(p));
export const removePhoto = id => run('readwrite', s => s.delete(id));

// Downscale big camera photos so storage stays small
export function resizeImage(file, max = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => (b ? resolve(b) : reject(new Error('resize failed'))), 'image/jpeg', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('not an image')); };
    img.src = url;
  });
}
