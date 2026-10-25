import { NavLink } from 'react-router-dom';
import { Home, Compass, Bookmark } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { to: '/', label: 'خانه', icon: Home },
    { to: '/explore', label: 'کاوش', icon: Compass },
    { to: '/watchlist', label: 'نشان‌شده‌ها', icon: Bookmark },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-panel border-t border-white/10 px-6 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-colors select-none ${
                  isActive ? 'text-primary-glow font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-primary-base/20 purple-glow' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px]">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};