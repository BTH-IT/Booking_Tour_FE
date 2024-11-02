import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { router } from './constants/router';
import Homepage from './pages/HomePage';
import SearchPage from './pages/TourSearchPage';
import RegisterPage from './pages/RegisterPage';
import TourDetailPage from './pages/TourDetailPage';
import AuthenticationaLayout from './layouts/AuthenticationLayout';
import TourPaymentPage from './pages/TourPaymentPage';
import RoomPaymentPage from './pages/RoomPaymentPage';
import RoomSearchPage from './pages/RoomSearchPage';
import RoomDetailPage from './pages/RoomDetailPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import AdminAuthenticationaLayout from './layouts/AdminAuthenticationLayout';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={router.home} element={<Homepage />} />
        <Route path={router.search} element={<SearchPage />} />
        <Route path={router.register} element={<RegisterPage />} />
        <Route path={router.tourDetail} element={<TourDetailPage />} />
        <Route path={router.rooms} element={<RoomSearchPage />} />
        <Route path={router.roomDetail} element={<RoomDetailPage />} />
      </Route>
      <Route element={<AuthenticationaLayout />}>
        <Route element={<DefaultLayout />}>
          <Route path={router.dashboard} element={<DashboardPage />} />
          <Route path={router.tourPayment} element={<TourPaymentPage />} />
          <Route path={router.roomPayment} element={<RoomPaymentPage />} />
        </Route>
      </Route>
      <Route element={<AdminAuthenticationaLayout />}>
        <Route element={<DefaultLayout />}>
          <Route path={router.admin} element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
