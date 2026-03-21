import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const SidebarLayout = () => (
  <div className='flex h-screen overflow-hidden'>
    {/* Desktop sidebar container - only takes space on md+ screens */}
    <div className='hidden md:block md:w-64'>
      <Sidebar />
    </div>

    {/* Mobile sidebar - positioned absolutely, doesn't take layout space */}
    <div className='md:hidden'>
      <Sidebar />
    </div>

    {/* Main content area */}
    <div className='flex-1 min-w-0 h-full overflow-y-auto'>
      <Outlet />
    </div>
  </div>
);

export default SidebarLayout;
