import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import PlayerModal from './components/PlayerModal';
import AdminPanel from './components/AdminPanel';

const seedMovies = [
  {
    id: '1',
    title: 'Nebula Rising',
    description: 'A rogue pilot and a scientist uncover a conspiracy that could wipe out the galaxy.',
    year: 2024,
    genre: 'Sci-Fi',
    // Example public embed sample (replace with real GDrive/Cloud embed links in admin)
    embedUrl: 'https://www.youtube.com/embed/5PSNL1qE6VY',
    poster: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Crimson Heist',
    description: 'A master thief assembles a crew for the ultimate museum job.',
    year: 2023,
    genre: 'Action',
    embedUrl: 'https://www.youtube.com/embed/2g811Eo7K8U',
    poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Quiet Harbor',
    description: 'A small-town mystery unfolds when a stranger washes ashore.',
    year: 2022,
    genre: 'Drama',
    embedUrl: 'https://www.youtube.com/embed/6ZfuNTqbHE8',
    poster: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function App() {
  const [movies, setMovies] = useState(seedMovies);
  const [playing, setPlaying] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [search, setSearch] = useState('');

  const featured = movies[0];

  const filtered = useMemo(() => {
    if (!search) return movies;
    const q = search.toLowerCase();
    return movies.filter((m) =>
      [m.title, m.genre, String(m.year)].some((v) => String(v).toLowerCase().includes(q))
    );
  }, [movies, search]);

  const onCreateMovie = (movie) => {
    setMovies((prev) => [movie, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <Navbar onSearch={setSearch} onOpenAdmin={() => setAdminOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Hero featured={featured} onPlay={setPlaying} />

        <MovieGrid title="Trending Now" movies={filtered} onPlay={setPlaying} />
      </main>

      <PlayerModal open={!!playing} movie={playing} onClose={() => setPlaying(null)} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} onCreate={onCreateMovie} />

      <footer className="border-t border-white/10 py-6 text-center text-white/50 text-sm">
        StreamBox — demo experience inspired by Netflix (not affiliated).
      </footer>
    </div>
  );
}
