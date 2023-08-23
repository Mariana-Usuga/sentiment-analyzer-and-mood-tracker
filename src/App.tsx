import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  // eslint-disable-next-line comma-dangle
  Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close'; // Importa el icono Close
import MoodState from './pages/MoodState';
import openAi from './services/apiService';

function App(): JSX.Element {
  //openAi()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };
  // eslint-disable-next-line
  const sideList = () => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='About' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Services' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Contact' />
        </ListItem>
      </List>
      <List>
        <ListItem button onClick={toggleDrawer(false)}>
          <ListItemText primary='Close' />
          <CloseIcon />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <div>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
            >
              hola
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {sideList()}
        </Drawer>
      </div>
    </>
  );
}

export default App;
/**
 * <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
 */
