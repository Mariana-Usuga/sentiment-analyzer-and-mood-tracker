import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
import SideListMenu from '../SideListMenu';

const Layout = () => (
  <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
    <NavBar />
    <div style={{ flex: 1 }}>
      <Outlet />
    </div>
  </div>
);

export default Layout;
