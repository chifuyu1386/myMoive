import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';

export const RootLayout = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-10 flex flex-col bg-bg-base text-zinc-100 selection:bg-primary-base selection:text-white">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};