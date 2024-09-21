import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { router } from "./constants/router";
import Homepage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import TourDetailPage from "./pages/TourDetailPage";
import AuthenticationaLayout from "./layouts/AuthenticationLayout";
import PaymentPage from "./pages/PaymentPage";
import RoomPage from "./pages/RoomPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import DashboardPage from "./pages/DashboardPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={router.home} element={<Homepage />} />
        <Route path={router.search} element={<SearchPage />} />
        <Route path={router.register} element={<RegisterPage />} />
        <Route path={router.tourDetail} element={<TourDetailPage />} />
        <Route path={router.rooms} element={<RoomPage />} />
        <Route path={router.roomDetail} element={<RoomDetailPage />} />
        <Route path={router.dashboard} element={<DashboardPage />} />
      </Route>
      <Route element={<AuthenticationaLayout />}>
        <Route element={<DefaultLayout />}>
          <Route path={router.payment} element={<PaymentPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
