import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const SidebarLayout = () => (
  <div className='flex'>
    <Sidebar />
    <Outlet />
  </div>
);

export default SidebarLayout;
