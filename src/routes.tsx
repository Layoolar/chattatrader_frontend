import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import Signup from './pages/Signup/Signup';
import VerifyOtp from './pages/VerifyOtp/VerifyOtp';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Chat = lazy(() => import('./pages/Chat/Chat'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComingSoon = lazy(() => import('./pages/ComingSoon/ComingSoon'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const VerifyOtp = lazy(() => import('./pages/VerifyOtp/VerifyOtp'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/soon',
        element: <ComingSoon />,
      },

      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/verify-otp',
        element: <VerifyOtp />,
      },
    ],
  },
]);
