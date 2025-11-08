import { useRef, useState } from 'react';
import { Upload, Link2, Image as ImageIcon, PlusCircle, X } from 'lucide-react';

export default function AdminPanel({ open, onClose, onCreate }) {
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    genre: 'Action',
    embedUrl: '',
    posterDataUrl: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onPickPoster = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, posterDataUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.embedUrl) return;
    onCreate({
      id: crypto.randomUUID(),
      title: form.title,
      description: form.description,
      year: Number(form.year) || new Date().getFullYear(),
      genre: form.genre,
      embedUrl: form.embedUrl,
      poster: form.posterDataUrl,
      createdAt: new Date().toISOString(),
    });
    setForm({ title: '', description: '', year: new Date().getFullYear(), genre: 'Action', embedUrl: '', posterDataUrl: '' });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4">
      <div className="w-full max-w-2xl bg-black border border-white/10 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-white font-semibold">Admin Panel • Add Movie</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2 rounded-md hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleCreate} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-white/80 text-sm">Title</label>
              <input name="title" value={form.title} onChange={onChange} className="w-full bg-white/5 text-white rounded-md px-3 py-2 border border-white/10 outline-none focus:ring-2 focus:ring-red-500/60" required />
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-sm">Year</label>
              <input name="year" type="number" value={form.year} onChange={onChange} className="w-full bg-white/5 text-white rounded-md px-3 py-2 border border-white/10 outline-none focus:ring-2 focus:ring-red-500/60" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-white/80 text-sm">Description</label>
              <textarea name="description" value={form.description} onChange={onChange} rows={3} className="w-full bg-white/5 text-white rounded-md px-3 py-2 border border-white/10 outline-none focus:ring-2 focus:ring-red-500/60" />
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-sm">Genre</label>
              <select name="genre" value={form.genre} onChange={onChange} className="w-full bg-white/5 text-white rounded-md px-3 py-2 border border-white/10 outline-none focus:ring-2 focus:ring-red-500/60">
                <option>Action</option>
                <option>Drama</option>
                <option>Comedy</option>
                <option>Horror</option>
                <option>Sci-Fi</option>
                <option>Romance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-sm flex items-center gap-2"><Link2 className="w-4 h-4"/> Embed URL (GDrive/Cloud)</label>
              <input name="embedUrl" value={form.embedUrl} onChange={onChange} placeholder="https://..." className="w-full bg-white/5 text-white rounded-md px-3 py-2 border border-white/10 outline-none focus:ring-2 focus:ring-red-500/60" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-white/80 text-sm flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Poster Image</label>
              <div className="flex items-center gap-3">
                <input ref={fileRef} type="file" accept="image/*" onChange={onPickPoster} className="hidden" />
                <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white border border-white/10 transition">
                  <Upload className="w-4 h-4" />
                  Upload Poster
                </button>
                {form.posterDataUrl && (
                  <img src={form.posterDataUrl} alt="Poster preview" className="h-20 rounded-md border border-white/10" />
                )}
              </div>
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-md transition">
              <PlusCircle className="w-4 h-4" />
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
