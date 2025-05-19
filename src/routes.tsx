import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import Signup from './pages/Signup/Signup';
import VerifyOtp from './pages/VerifyOtp/VerifyOtp';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        element: <Signup />
      },
      {
        path: '/verify-otp',
        element: <VerifyOtp />
      }
    ],
  },
]);
