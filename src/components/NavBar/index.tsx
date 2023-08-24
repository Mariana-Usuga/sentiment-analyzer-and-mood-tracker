import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  CssBaseline,
  useMediaQuery,
  useTheme,
  Typography,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import TimelineIcon from '@mui/icons-material/Timeline';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Outlet } from 'react-router-dom';
import { auth } from '../../firebase';
import { CustomError } from '../../models/customError';

const drawerWidth = 240;

const NavBar: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const iconMap = [
    <InsertEmoticonIcon />,
    <TimelineIcon />,
    <ContentPasteIcon />,
  ];

  const signOut = async () => {
    try {
      await auth.signOut();
      console.log('Sesión cerrada correctamente.');
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
          <Typography variant='h6' noWrap>
            Analisis de sentimientos
          </Typography>
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
            <ListItem button style={{ padding: '20px' }}>
              <ListItemIcon>
                <InsertEmoticonIcon />
              </ListItemIcon>
              <Link
                href='/moodState'
                style={{
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                }}
              >
                ¿Como estas?
              </Link>
            </ListItem>
            <ListItem button style={{ padding: '20px' }}>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <Link
                href='/trendVisualization'
                style={{
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                }}
              >
                Tendencias
              </Link>
            </ListItem>
            <ListItem button style={{ padding: '20px' }} onClick={signOut}>
              <ListItemIcon></ListItemIcon>
              <Link
                href='/'
                style={{
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                }}
              >
                Sign Out
              </Link>
            </ListItem>
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
