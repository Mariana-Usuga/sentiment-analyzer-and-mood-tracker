import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ContentPaste from '@mui/icons-material/ContentPaste';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import TimelineIcon from '@mui/icons-material/Timeline';
// import { useState } from 'react';
import React from 'react';

const SideListMenu: React.FC = () => {
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
