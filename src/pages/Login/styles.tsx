import { Paper } from '@mui/material';
import styled from 'styled-components';

export const ButtonGoogle = styled(Paper)(() => ({
  googleButton: {
    transition: 'background-color .3s, box-shadow .3s',
    padding: '12px 16px 12px 42px',
    border: 'none',
    borderRadius: '3px',
    color: '#757575',
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    fontSize: '14px',
    fontWeight: '500',
    '&:hover': {
      boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25)',
    },
  },
}));
