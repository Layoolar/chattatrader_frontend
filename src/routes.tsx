import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ComingSoon from './pages/ComingSoon';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
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
    ],
  },
]);
