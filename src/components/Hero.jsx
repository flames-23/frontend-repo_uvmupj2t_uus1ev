import { Play } from 'lucide-react';

export default function Hero({ featured, onPlay }) {
  if (!featured) return null;

  return (
    <section className="relative aspect-[16/7] w-full overflow-hidden rounded-xl">
      <img
        src={featured.poster}
        alt={featured.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg max-w-3xl">
          {featured.title}
        </h1>
        <p className="mt-3 text-white/80 max-w-2xl line-clamp-3">
          {featured.description}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => onPlay(featured)}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-5 py-2 rounded-md hover:bg-white/90 transition"
          >
            <Play className="w-5 h-5 fill-black" />
            Play
          </button>
          <span className="text-white/70 text-sm">{featured.year} • {featured.genre}</span>
        </div>
      </div>
    </section>
  );
}
