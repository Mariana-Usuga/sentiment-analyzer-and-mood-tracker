import {
  Container,
  Grid,
  IconButton,
  Paper,
  TextareaAutosize,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import { red, teal, green, lightBlue, orange } from '@mui/material/colors';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/system';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserInfo, updateUser } from '../../fireabse';

interface ButtonStates {
  incredible: boolean;
  fine: boolean;
  sad: boolean;
  horrible: boolean;
  neutral: boolean;
}

const TitleSentimient = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'bolder',
  fontfamily: 'emoji',
  padding: theme.spacing(1),
  textAlign: 'center',
  elevation: 0, // Esto elimina el borde de Paper
}));

function MoodState(): JSX.Element {
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [userCurrent, setUserCurrent] = useState<any>();
  const [userCurrentMood, setUserCurrentMood] = useState<any>();

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      //console.log('user ', user)
      const getUser = await getUserInfo(user.uid);
      setUserCurrent(getUser);
      setUserCurrentMood(getUser?.moods);
    });
  }, []);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const handleIconButtonClick = (value: string) => {
    setSelectedValue(value);
  };

  const send = /*async*/ () => {
    console.log('sele ', selectedValue);
    //setApiResponse(/*await*/ openAi(selectedValue, textareaValue));
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const newState = {
      emoji: selectedValue,
      comment: textareaValue,
      date: formattedDate,
      diagnosis: 'habla con tus amigos',
    };

    updateUser({
      uid: userCurrent?.uid,
      displayName: userCurrent?.displayName,
      profilePicture: '',
      moods: [...userCurrentMood, newState],
    });
  };

  const sizeIcon = {
    fontSize: '70px',
  };

  const [buttonClicked, setButtonClicked] = useState<ButtonStates>({
    incredible: false,
    fine: false,
    neutral: false,
    sad: false,
    horrible: false,
  });

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
  return (
    <>
      <Container maxWidth='sm' style={{ marginTop: '100px' }}>
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
              <IconButton onClick={() => handleIconButtonClick('incredible ')}>
                <SentimentVerySatisfiedOutlinedIcon style={sizeIcon} />
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
              <IconButton onClick={() => handleIconButtonClick('fine ')}>
                <SentimentSatisfiedAltOutlinedIcon style={sizeIcon} />
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
              <IconButton onClick={() => handleIconButtonClick('neutral ')}>
                <SentimentNeutralOutlinedIcon style={sizeIcon} />
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
              <IconButton onClick={() => handleIconButtonClick('sad ')}>
                <SentimentDissatisfiedOutlinedIcon style={sizeIcon} />
              </IconButton>
            </Button>
            <TitleSentimient>Mal</TitleSentimient>
          </Grid>
          <Grid item xs={2.4} textAlign='center'>
            <Button
              variant='contained'
              onClick={() => handleButtonClick('horrible')}
              style={{
                backgroundColor: buttonClicked?.horrible ? red[800] : red[200],
              }}
            >
              <IconButton onClick={() => handleIconButtonClick('horrible ')}>
                <SentimentVeryDissatisfiedOutlinedIcon style={sizeIcon} />
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
        <Button variant='outlined' onClick={() => send()}>
          Enviar
        </Button>
        <h6>{apiResponse}</h6>
      </Container>
    </>
  );
}

export default MoodState;
//              <SentimentVerySatisfiedOutlinedIcon style={sizeIcon} />
