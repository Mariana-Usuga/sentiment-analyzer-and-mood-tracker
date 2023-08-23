import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { auth, getUserInfo } from '../../fireabse';
import { useNavigate } from 'react-router-dom';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import './c.css';
import { Typography } from '@mui/material';

const CustomCalendarContainer = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}));

const CustomTile = styled('div')(({ theme }) => ({
  '&.react-calendar__tile--active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const EmojiCalendar = () => {
  let navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodData, setMoodData] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      //console.log('user ', user)
      //const getUser = await getUserInfo(user?.uid);
      //setMoodData(getUser?.moods);
      setMoodData([]);
    });
  }, []);

  const renderTileContent = ({ date }: any) => {
    let show = '';
    if (moodData.length > 0) {
      /*const matchingMood = moodData?.find(
        item => item?.date === date.toISOString().split('T')[0],
      );*/
      const matchingMood = moodData?.find(item => {
        console.log('date ', item.date);
        return item?.date === date.toISOString().split('T')[0];
      });
      console.log('mat ', matchingMood);
      console.log('emoji ', matchingMood?.emoji);
      if (matchingMood?.emoji === 'incredible ') {
        return <SentimentVerySatisfiedOutlinedIcon />;
      }
      if (matchingMood?.emoji === 'fine ') {
        return <SentimentSatisfiedAltOutlinedIcon />;
      }
      if (matchingMood?.emoji === 'neutral ') {
        return <SentimentNeutralOutlinedIcon />;
      }
      if (matchingMood?.emoji === 'sad ') {
        return <SentimentDissatisfiedOutlinedIcon />;
      }
      if (matchingMood?.emoji === 'horrible ') {
        return <SentimentVeryDissatisfiedOutlinedIcon />;
      }
    }
  };

  const handleDateChange = (value: any, event: any) => {
    setSelectedDate(value);
  };

  return (
    <>
      <Calendar selectRange={false} tileContent={renderTileContent} />
    </>
  );
};

export default EmojiCalendar;

//import { Container, Grid, TextField, Typography } from '@mui/material';
//import { useState } from 'react';
/*import AdapterDateFns from '@mui/lab/AdapterDateFns'; // Importa el adaptador de date-fns
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    // Aquí puedes agregar la lógica para manejar la fecha seleccionada y realizar acciones según sea necesario.
    //        renderInput={(params: any) => <TextField {...params} />}
  };
  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Calendario
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </Container>
  );
}*/
