import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { router } from './constants/router';
import Homepage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={router.home} element={<Homepage />} />
        <Route path={router.search} element={<SearchPage />} />
        <Route path={router.register} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
