import AuthenticationaLayout from '@/templaetes/authenticationLayout';
import LoginLayout from '@/templaetes/loginLayout';
import { Routes, Router, Route } from 'react-router-dom';

export default function AppRouter() {
    return (
        <Routes>
        <Route element= {< AuthenticationaLayout />}>
            <Route></Route>
            < /Route>
            < Route element = {< LoginLayout />}> </>
                < /Routes>
    );
};