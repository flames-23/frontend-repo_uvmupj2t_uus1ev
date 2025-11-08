import { useState } from 'react';
import { Home, Search, User, Settings } from 'lucide-react';

export default function Navbar({ onSearch, onOpenAdmin }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-red-500">
          <Home className="w-6 h-6" />
          <span className="font-bold text-white text-lg">StreamBox</span>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, shows, genres..."
              className="w-full bg-white/5 text-white placeholder-white/50 rounded-md pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-red-500/60 border border-white/10"
            />
          </div>
        </form>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white border border-white/10 transition"
          >
            <Settings className="w-4 h-4" />
            Admin
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white border border-white/10 transition">
            <User className="w-4 h-4" />
            Profile
          </button>
        </div>
      </div>
    </header>
  );
}
