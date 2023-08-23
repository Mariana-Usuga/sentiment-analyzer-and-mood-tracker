import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Importa el icono Close
import { Drawer } from '@mui/material';
import ContentCut from '@mui/icons-material/ContentCut';
import Typography from '@mui/material/Typography';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Cloud from '@mui/icons-material/Cloud';
import ContentPaste from '@mui/icons-material/ContentPaste';
import LoginIcon from '@mui/icons-material/Login';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TimelineIcon from '@mui/icons-material/Timeline';
// import { useState } from 'react';
import React from 'react';

const SideListMenu = () => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  //      onClose={isDrawerOpen}

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <InsertEmoticonIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Registro de Estado de Animo</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TimelineIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Visualizacion de Tendecias</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize='small' />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘V
          </Typography>
        </MenuItem>
        <Divider />
      </MenuList>
    </Paper>
  );
};

export default SideListMenu;

/**     
 *  
 * <div role='presentation'>
      <List>
        <ListItem button>
          <ListItemText primary='Registro' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Visualizacion de Tendecias' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Sign Out' />
        </ListItem>
      </List>
    </div>
 * <List>
        <ListItem button onClick={toggleDrawer(false)}>
          <ListItemText primary='Close' />
          <CloseIcon />
        </ListItem>
      </List>
 */
