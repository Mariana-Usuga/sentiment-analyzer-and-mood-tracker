import { Paper } from '@mui/material';
import styled from 'styled-components';

export const TitleSentimient = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'bolder',
  fontfamily: 'emoji',
  //padding: theme.spacing(1),
  textAlign: 'center',
  elevation: 0,
}));

export const TitleCalender = styled('div')(({ theme }) => ({
  color: '#4e73df!important',
  fontSize: '1.2rem',
  fontWeight: 'bolder',
  padding: '10px',
  paddingBottom: '20px',
  boxShadow: 'none',
}));
