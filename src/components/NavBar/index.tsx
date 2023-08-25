import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Outlet } from 'react-router-dom';
import { auth } from '../../firebase';
import { CustomError } from '../../models/customError';
import SideListMenu from '../SideListMenu';

const drawerWidth = 240;

const NavBar: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('token');
    } catch (error) {
      const customError: CustomError = error as CustomError;
      console.error('Error al cerrar sesión:', customError.message);
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div style={{ width: drawerWidth }}>
          <IconButton onClick={toggleDrawer}>
            {isSmallScreen ? <ChevronLeftIcon /> : null}
          </IconButton>
          <List style={{ marginTop: '40px' }}>
            <SideListMenu signOut={signOut} />
          </List>
        </div>
      </Drawer>
      <div
        style={{
          marginLeft: isSmallScreen ? 0 : drawerWidth,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
