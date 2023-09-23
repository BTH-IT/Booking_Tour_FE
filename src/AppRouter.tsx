import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { router } from './constants/router';
import Homepage from './pages/HomePage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={router.home} element={<Homepage />} />
      </Route>
    </Routes>
  );
}
