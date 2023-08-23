import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import TimelineIcon from '@mui/icons-material/Timeline';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Link, Outlet } from 'react-router-dom';

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
          <List>
            {[
              { text: 'Registro de Estado de Animo', link: '/moodState' },
              {
                text: 'Visualizacion de Tendecias',
                link: '/trendVisualization',
              },
              { text: 'Sign Out', link: '/' },
            ].map((item, index) => (
              <ListItem button key={item.text}>
                <ListItemIcon>{iconMap[index]}</ListItemIcon>
                <ListItemText
                  primary={<Link to={item.link}>{item.text}</Link>}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <div
        style={{
          marginLeft: isSmallScreen ? 0 : drawerWidth,
          padding: theme.spacing(3),
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
