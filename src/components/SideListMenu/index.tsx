import React from 'react';
import { ListItem, ListItemIcon, Link } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import TimelineIcon from '@mui/icons-material/Timeline';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

type NavListItemsProps = {
  signOut: () => void;
};

const SideListMenu: React.FC<NavListItemsProps> = ({ signOut }) => {
  return (
    <>
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
        <ListItemIcon>
          <ContentPasteIcon />
        </ListItemIcon>
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
    </>
  );
};

export default SideListMenu;
