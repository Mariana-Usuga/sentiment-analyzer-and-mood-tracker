import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
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
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink } from 'react-router-dom'; // Importa el Link de React Router
import { auth } from '../../fireabse';

const drawerWidth = 240;

const NavBar = () => {
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
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
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
            Persistent Drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
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
                Registro
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
                Visualizacion
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
/****
 *  <List>
            {[
              { text: 'Registro de Estado de Animo', link: '/moodState' },
              {
                text: 'Visualizacion de Tendecias',
                link: '/trendVisualization',
              },
            ].map((item, index) => (
              <ListItem button key={item.text}>
                <ListItemIcon>{iconMap[index]}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography>
                      <Link href='/'>Registro de Estado de Animo</Link>
                      <Link href='/'>Visualizacion de Tendecias</Link>
                      <Link href='/'>Sign Out</Link>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
 * 
 * 
 *                       <Link href={item.link}>{item.text}</Link>

 *  primary={<Link to={item.link}>{item.text}</Link>}
 */
