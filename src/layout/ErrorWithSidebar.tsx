import Sidebar from '../components/Sidebar';

export const ErrorWithSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className='flex'>
    <Sidebar />
    <div className='flex-1'>{children}</div>
  </div>
);
