import { Container, Paper, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserInfo, updateUser } from '../../firebase';
import { openAi } from '../../services/apiService';
import { ButtonStates } from '../../models/sentimientState';
import { TitleCalender } from './styles';
import { moodButtons } from './moodButtons';
import { scaleMappings } from './scaleMoods';
import MoodButtonGrid from '../../components/MoodStateGrid';
import CustomSnackbar from '../../components/CustomSnackbar';
import CustomTextarea from '../../components/CustomTextArea';
import CustomButton from '../../components/CustomButton';
import RadioGroupControl from '../../components/RadioGroupControl';

const MoodState: React.FC = () => {
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [apiResponse, setApiResponse] = useState('');
  const [userCurrent, setUserCurrent] = useState<any>();
  const [isOpenSelectedMood, setIsOpenSelectedMood] = useState(false);
  const [openWarningYet, setOpenWarningYet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingApi, setIsLoadingApi] = useState(true);
  const [selectedRadioText, setSelectedRadioText] = useState(
    'Registrar estado cada dia',
  );

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
        if (getUser) {
          console.log('user current moods', getUser.moods);
          setIsLoading(true);
        }
        setUserCurrent(getUser);
      }
    });
  }, []);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const handleCloseSnackbar = () => {
    //setIsLoadingApi(true);
    console.log('entra en handle close sn');
    setIsOpenSelectedMood(false);
  };

  const handleCloseSnackbarYetMood = () => {
    //setIsLoadingApi(true);
    console.log('entra en handle close YET MOOD');
    setOpenWarningYet(false);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioText(event.target.value);
  };

  const updateMoods = async () => {
    if (!selectedValue) {
      console.log('first if');
      setIsOpenSelectedMood(true);
      return;
    }
    console.log('selectedValue first ', selectedValue);
    const responseOpenAi = await openAi(selectedValue, textareaValue);
    if (responseOpenAi.message) {
      return setApiResponse(
        'Lo siento hay problemas con la clave de OpenAi, por favor cambia la clave',
      );
    } else {
      setApiResponse(responseOpenAi);
      if (responseOpenAi) setIsLoadingApi(true);
    }
    console.log('continuo');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let scale = 1;

    if (
      selectedValue === 'incredible' ||
      selectedValue === 'fine' ||
      selectedValue === 'neutral' ||
      selectedValue === 'sad'
    ) {
      scale = scaleMappings[selectedValue];
    }

    const newState = {
      emoji: selectedValue,
      comment: textareaValue,
      date: formattedDate,
      diagnosis: responseOpenAi,
      feelingScale: scale,
    };

    const newUp = {
      uid: userCurrent?.uid,
      displayName: userCurrent?.displayName,
      moods: [...userCurrent.moods, newState],
    };
    console.log('newUp ', newUp);
    console.log('newUp ', userCurrent.moods);
    setUserCurrent(newUp);
    updateUser(newUp);
  };

  const send = async () => {
    //setIsLoadingApi(false);
    if (selectedRadioText === 'Registrar mas estados de animo') {
      updateMoods();
      setIsLoadingApi(false);
      return;
    }

    const currentDate = new Date();
    const lastDay = userCurrent?.moods.slice(-1)[0];
    const dateSeparate = lastDay?.date?.split('-');
    console.log('dateSeparate ', dateSeparate);
    console.log('selectedValue ', selectedValue);
    if (!selectedValue) {
      console.log('!selectedValue ', !selectedValue);
      setIsOpenSelectedMood(true);
      setApiResponse('');
      return;
    }

    if (!dateSeparate) {
      console.log('enttra en !dateSeparate IF');
      updateMoods();
    } else {
      if (Number(dateSeparate[2]) >= currentDate.getDate()) {
        setOpenWarningYet(true);
      } else {
        updateMoods();
      }
    }
  };

  const handleButtonClick = (senti: string) => {
    setSelectedValue(senti);
    setIsOpenSelectedMood(false);
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
      {!isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Typography variant='h6'>Cargando...</Typography>
        </div>
      ) : (
        <Container maxWidth='sm' style={{ marginTop: '100px' }}>
          <TitleCalender>¿Como te sientes hoy?</TitleCalender>
          <MoodButtonGrid
            moodButtons={moodButtons}
            buttonClicked={buttonClicked}
            handleButtonClick={handleButtonClick}
          />
          <CustomTextarea
            value={textareaValue}
            onChange={handleTextareaChange}
          />
          <CustomButton onClick={send}>Enviar</CustomButton>
          <RadioGroupControl
            selectedValue={selectedRadioText}
            onRadioChange={handleRadioChange}
          />
          <CustomSnackbar
            open={isOpenSelectedMood}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            message='Debes seleccionar un estado de animo.'
          />
          <CustomSnackbar
            open={openWarningYet}
            autoHideDuration={4000}
            onClose={handleCloseSnackbarYetMood}
            message='Ya ingresaste el sentimiento de hoy.'
          />
          {isLoadingApi ? (
            <Typography variant='body1' sx={{ marginTop: '20px' }}>
              {apiResponse}
            </Typography>
          ) : (
            <Typography variant='h6'>Cargando...</Typography>
          )}
        </Container>
      )}
    </>
  );
};

export default MoodState;
/**    
 *           <Paper elevation={3} style={{ padding: '20px' }}>

 */
