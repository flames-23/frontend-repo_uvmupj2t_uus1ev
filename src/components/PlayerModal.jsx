import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function PlayerModal({ open, onClose, movie }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4">
      <div className="w-full max-w-5xl bg-black border border-white/10 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div>
            <h3 className="text-white font-semibold">{movie.title}</h3>
            <p className="text-white/60 text-sm">{movie.year} • {movie.genre}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2 rounded-md hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          {/* We use an iframe for embedded streaming sources like GDrive/Cloud */}
          {movie.embedUrl ? (
            <iframe
              src={movie.embedUrl}
              title={movie.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-white/50">No source available</div>
          )}
        </div>
      </div>
    </div>
  );
}
