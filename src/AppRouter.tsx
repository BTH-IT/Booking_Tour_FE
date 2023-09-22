import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { router } from './constants/router';
import Homepage from './pages/HomePage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={router.home} element={<Homepage />} />
      </Route>
    </Routes>
  );
}
