import {
  Alert,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import { red, teal, green, lightBlue, orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserInfo, updateUser } from '../../firebase';
import { openAi } from '../../services/apiService';
import { ButtonStates } from '../../models/sentimientState';
import { TitleCalender, TitleSentimient } from './styles';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const MoodState: React.FC = () => {
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [sent, setSent] = useState(false);
  const [userCurrent, setUserCurrent] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [openWarningYet, setOpenWarningYet] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(false);
  const [selectedRadioText, setSelectedRadioText] = useState('');

  const [buttonClicked, setButtonClicked] = useState<ButtonStates>({
    incredible: false,
    fine: false,
    neutral: false,
    sad: false,
    awful: false,
  });

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const getUser = await getUserInfo(user?.uid);
        setUserCurrent(getUser);
        console.log('get ', getUser);
      }
    });
  }, []);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const handleIconButtonClick = (value: string) => {
    setSelectedValue(value);
  };

  const update = async () => {
    if (selectedValue != '') {
      console.log('moods ', userCurrent.moods);
      const responseOpenAi = await openAi(selectedValue, textareaValue);
      setApiResponse(responseOpenAi);
      setSent(true);
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      console.log('responseOpenAi ', responseOpenAi);
      const formattedDate = `${year}-${month}-${day}`;
      let scale = 1;
      if (selectedValue == 'incredible') {
        scale = 5;
      }
      if (selectedValue == 'fine') {
        scale = 4;
      }
      if (selectedValue == 'neutral') {
        scale = 3;
      }
      if (selectedValue == 'sad') {
        scale = 2;
      }

      const newState = {
        emoji: selectedValue,
        comment: textareaValue,
        date: formattedDate,
        diagnosis: responseOpenAi,
        feelingScale: scale,
      };

      updateUser({
        uid: userCurrent?.uid,
        displayName: userCurrent?.displayName,
        moods: [...userCurrent.moods, newState],
      });
    } else {
      console.log('entra en else');
      setIsOpen(true);
    }
  };

  const send = async () => {
    const lastDay = userCurrent.moods.slice(-1)[0];
    const date = new Date();
    console.log('lastDay ', lastDay);
    const [year, month, day] = lastDay?.date?.split('-');
    if (selectedRadioText === 'Registrar mas estados de animo') {
      update();
    } else {
      if (Number(day) >= date.getDate()) {
        setOpenWarningYet(true);
      } else {
        update();
      }
    }
  };

  const handleButtonClick = (senti: keyof ButtonStates) => {
    setButtonClicked(prevStates => {
      const updatedStates = { ...prevStates };
      for (const key in updatedStates) {
        if (key !== senti) {
          updatedStates[key as keyof ButtonStates] = false;
        }
      }
      updatedStates[senti] = true;
      return updatedStates;
    });
  };
  const handleCloseSnackbar = () => {
    setIsOpen(false);
  };
  const sentYet = () => {
    setOpenWarningYet(false);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(!selectedRadio);
    setSelectedRadioText(event.target.value);
  };

  return (
    <>
      <Container maxWidth='sm' style={{ marginTop: '100px' }}>
        <TitleCalender>¿Como te sientes hoy?</TitleCalender>
        <Grid container>
          <Grid item xs={2.4} textAlign='center'>
            <Button
              variant='contained'
              onClick={() => handleButtonClick('incredible')}
              style={{
                backgroundColor: buttonClicked?.incredible
                  ? teal[800]
                  : teal[200],
              }}
            >
              <IconButton onClick={() => handleIconButtonClick('incredible')}>
                <SentimentVerySatisfiedOutlinedIcon />
              </IconButton>
            </Button>
            <TitleSentimient>Increible</TitleSentimient>
          </Grid>
          <Grid item xs={2.4} textAlign='center'>
            <Button
              variant='contained'
              onClick={() => handleButtonClick('fine')}
              style={{
                backgroundColor: buttonClicked?.fine ? green[800] : green[200],
              }}
            >
              <IconButton onClick={() => handleIconButtonClick('fine')}>
                <SentimentSatisfiedAltOutlinedIcon />
              </IconButton>
            </Button>
            <TitleSentimient>Bien</TitleSentimient>
          </Grid>
          <Grid item xs={2.4} textAlign='center'>
            <Button
              variant='contained'
              onClick={() => handleButtonClick('neutral')}
              style={{
                backgroundColor: buttonClicked?.neutral
                  ? lightBlue[800]
                  : lightBlue[200],
              }}
            >
              <IconButton onClick={() => handleIconButtonClick('neutral')}>
                <SentimentNeutralOutlinedIcon />
              </IconButton>
            </Button>
            <TitleSentimient>Neutra</TitleSentimient>
          </Grid>
          <Grid item xs={2.4} textAlign='center'>
            <Button
              variant='contained'
              onClick={() => handleButtonClick('sad')}
              style={{
                backgroundColor: buttonClicked?.sad ? orange[800] : orange[200],
              }}
            >
              <IconButton onClick={() => handleIconButtonClick('sad')}>
                <SentimentDissatisfiedOutlinedIcon />
              </IconButton>
            </Button>
            <TitleSentimient>Mal</TitleSentimient>
          </Grid>
          <Grid item xs={2.4} textAlign='center'>
            <Button
              variant='contained'
              onClick={() => handleButtonClick('awful')}
              style={{
                backgroundColor: buttonClicked?.awful ? red[800] : red[200],
              }}
            >
              <IconButton onClick={() => handleIconButtonClick('awful')}>
                <SentimentVeryDissatisfiedOutlinedIcon />
              </IconButton>
            </Button>
            <TitleSentimient>Horrible</TitleSentimient>
          </Grid>
        </Grid>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <TextareaAutosize
            aria-label='empty textarea'
            placeholder='Escribe aquí...'
            minRows={5}
            style={{ width: '100%' }}
            value={textareaValue}
            onChange={handleTextareaChange}
          />
        </Paper>
        <Button
          variant='outlined'
          style={{ marginRight: '20px' }}
          onClick={() => send()}
        >
          Enviar
        </Button>
        <FormControl>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value='Registrar mas estados de animo'
              control={<Radio />}
              label='Registrar mas estados de animo'
            />
            <FormControlLabel
              value='Cada dia'
              control={<Radio />}
              label='Cada dia'
            />
          </RadioGroup>
        </FormControl>
        <Snackbar
          open={isOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity='warning'>
            Debes seleccionar un estado de animo.
          </Alert>
        </Snackbar>
        <Snackbar
          open={openWarningYet}
          autoHideDuration={4000}
          onClose={sentYet}
        >
          <Alert onClose={sentYet} severity='warning'>
            Ya ingresaste el sentimiento de hoy.
          </Alert>
        </Snackbar>
        <Typography variant='body1' sx={{ marginTop: '20px' }}>
          {apiResponse}
        </Typography>
      </Container>
    </>
  );
};

export default MoodState;

const update = () => {};
//              <SentimentVerySatisfiedOutlinedIcon style={sizeIcon} />
/**    
 * <Box>
          {iconSelected ? (
            <Alert severity='warning'>'Selecciona un estado de animo'</Alert>
          ) : null}
        </Box>
 */
