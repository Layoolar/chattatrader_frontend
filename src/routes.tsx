import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ComingSoon from './pages/ComingSoon';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Discovery = lazy(() => import('./pages/discovery'));
const WalletPage = lazy(() => import('./pages/wallets'))
const NotFound = lazy(() => import('./pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/dffkrjfkr',
        element: <Home />,
      },
      {
        path: '/',
        element: <ComingSoon />,
      },

      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/discovery',
        element: <Discovery />
      },
      {
       path: '/wallet',
       element: <WalletPage />
      }
    ],
  },
]);
