import { Play, Film } from 'lucide-react';

function MovieCard({ movie, onPlay }) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden">
      <div className="aspect-[2/3] w-full overflow-hidden">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-black/30 text-white/40">
            <Film className="w-10 h-10" />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-white font-semibold truncate" title={movie.title}>{movie.title}</h3>
        <p className="text-white/60 text-sm truncate">{movie.genre} • {movie.year}</p>
        <button
          onClick={() => onPlay(movie)}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-3 py-2 rounded-md transition"
        >
          <Play className="w-4 h-4" />
          Play
        </button>
      </div>
    </div>
  );
}

export default function MovieGrid({ title, movies, onPlay }) {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-xl font-bold">{title}</h2>
        <span className="text-white/50 text-sm">{movies.length} items</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
}
