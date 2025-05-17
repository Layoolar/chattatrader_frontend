import { createBrowserRouter } from 'react-router-dom';
import App from './App';
//import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // {
      //   path: '/',
      //   element: <Home />,
      // },
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
