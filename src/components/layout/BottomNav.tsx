import { Home, Compass, Bookmark } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { id: 'home', label: 'خانه', icon: Home, active: true },
    { id: 'explore', label: 'کاوش', icon: Compass, active: false },
    { id: 'watchlist', label: 'نشان‌شده‌ها', icon: Bookmark, active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-panel border-t border-white/10 px-6 py-2.5">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center gap-1 transition-colors select-none ${
                item.active ? 'text-primary-glow' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${item.active ? 'bg-primary-base/20' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};