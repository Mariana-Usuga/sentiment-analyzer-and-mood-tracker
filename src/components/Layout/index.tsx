import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';

const Layout: React.FC = () => (
  <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
    <NavBar />
    <div style={{ flex: 1 }}>
      <Outlet />
    </div>
  </div>
);

export default Layout;
