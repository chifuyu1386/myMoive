import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { WatchlistPage } from './pages/WatchList';
import { MovieDetailsPage } from './pages/MovieDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="watchlist" element={<WatchlistPage />} />
          <Route path='movie/:id' element={<MovieDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}