import { Paper } from '@mui/material';
import styled from 'styled-components';

export const TitleSecondary = styled(Paper)(({ theme }) => ({
  color: '#4e73df!important',
  fontSize: '1.2rem',
  fontWeight: 'bolder',
  boxShadow: '0 .18rem 1.75rem 0 rgba(58,59,69,.15)!important',
  border: '1px solid #e3e6f0',
  //padding: theme.spacing(2),
  padding: '10px',
  backgroundColor: '#fff',
  display: 'block',
}));

export const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 .18rem 1.75rem 0 rgba(58,59,69,.15)!important',
  border: '1px solid #e3e6f0',
  padding: '20px 20px',
}));
