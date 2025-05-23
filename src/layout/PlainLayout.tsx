import { Outlet } from 'react-router-dom';

const PlainLayout = () => (
  <div className='w-full'>
    <Outlet />
  </div>
);

export default PlainLayout;
