import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import SidebarLayout from './layout/SideLayout';
import PlainLayout from './layout/PlainLayout';

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
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/chat', element: <Chat /> },
      { path: '/soon', element: <ComingSoon /> },
    ],
  },
  {
    path: '/',
    element: <PlainLayout />,
    children: [
      { path: '/sign-up', element: <Signup /> },
      { path: '/verify-otp', element: <VerifyOtp /> },
    ],
  },
]);
