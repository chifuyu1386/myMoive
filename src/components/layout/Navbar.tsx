import { Film, Search } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-primary-base/20 border border-primary-base/40 text-primary-glow purple-glow">
          <Film className="w-5 h-5" />
        </div>
        <span className="text-lg font-extrabold tracking-tight bg-gradient-to-l from-white via-zinc-200 to-primary-glow bg-clip-text text-transparent">
          مای‌مووی
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="glass" size="sm" className="rounded-full w-9 h-9 p-0">
          <Search className="w-4 h-4 text-zinc-300" />
        </Button>
      </div>
    </header>
  );
};