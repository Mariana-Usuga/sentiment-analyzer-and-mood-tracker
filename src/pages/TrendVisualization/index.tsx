import { Typography, Container, Grid, Box } from '@mui/material';
import Calendar from '../../components/Calendar';
import Graphic from '../../components/Graphic';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //...theme.typography.body2,
  //padding: theme.spacing(1),
  textAlign: 'center',
  //color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 .18rem 1.75rem 0 rgba(58,59,69,.15)!important',
  border: '1px solid #e3e6f0',
  padding: '20px 20px',
}));

const TitleCalender = styled(Paper)(({ theme }) => ({
  color: '#4e73df!important',
  fontSize: '1.2rem',
  fontWeight: 'bolder',
  fontfamily: 'emoji',
  boxShadow: '0 .18rem 1.75rem 0 rgba(58,59,69,.15)!important',
  border: '1px solid #e3e6f0',
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  display: 'block',
}));

export default function TrendVisualization() {
  return (
    <Container sx={{ marginTop: '80px' }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={12} lg={5.5}>
          <TitleCalender>Calendario</TitleCalender>
          <Item>
            <Calendar />
          </Item>
        </Grid>
        <Grid item xs={12} md={12} lg={5.5}>
          <TitleCalender>Grafico</TitleCalender>
          <Item>
            <Graphic />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
/***  
 *       <Typography>Visualizacion de Tendencias</Typography>
<Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important',
              borderRadius: '0.35rem',
            }}
          >
 */
