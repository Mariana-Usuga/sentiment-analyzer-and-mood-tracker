import { Container, Grid } from '@mui/material';
import Calendar from '../../components/Calendar';
import Graphic from '../../components/Graphic';
import { Item, TitleSecondary } from './styles';

const TrendVisualization: React.FC = () => {
  return (
    <Container sx={{ marginTop: '80px' }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={12} lg={5.5}>
          <TitleSecondary>Calendario</TitleSecondary>
          <Item>
            <Calendar />
          </Item>
        </Grid>
        <Grid item xs={12} md={12} lg={5.5}>
          <TitleSecondary>Grafico</TitleSecondary>
          <Item>
            <Graphic />
          </Item>
        </Grid>
      </Grid>
      <h5>Tendencias Observadas: </h5>
    </Container>
  );
};

export default TrendVisualization;
