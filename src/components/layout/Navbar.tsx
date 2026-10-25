// src/components/layout/Navbar.tsx
import { NavLink } from 'react-router-dom';
import { Film, Search, Home, Compass, Bookmark } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const navLinks = [
    { to: '/', label: 'خانه', icon: Home },
    { to: '/explore', label: 'کاوش فیلم‌ها', icon: Compass },
    { to: '/watchlist', label: 'نشان‌شده‌ها', icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          {/* لوگو */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-primary-base/20 border border-primary-base/40 text-primary-glow purple-glow transition-transform group-hover:scale-105">
              <Film className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-l from-white via-zinc-200 to-primary-glow bg-clip-text text-transparent">
              مای‌مووی
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all select-none ${
                      isActive
                        ? 'bg-primary-base/15 text-primary-glow border border-primary-base/30 purple-glow'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <NavLink to="/explore">
            <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl glass-card text-zinc-400 hover:text-zinc-200 hover:border-white/20 transition-all cursor-pointer text-sm">
              <Search className="w-4 h-4 text-primary-glow" />
              <span>جستجوی فیلم، بازیگر...</span>
            </div>

            <Button
              variant="glass"
              size="sm"
              className="sm:hidden rounded-full w-9 h-9 p-0"
            >
              <Search className="w-4 h-4 text-zinc-300" />
            </Button>
          </NavLink>
        </div>

      </div>
    </header>
  );
};