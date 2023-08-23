import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { auth, getUserInfo } from '../../fireabse';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import './c.css';

const EmojiCalendar = () => {
  const [moodData, setMoodData] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const getUser = await getUserInfo(user?.uid);
        setMoodData(getUser?.moods);
      }
    });
  }, []);

  const renderTileContent = ({ date }: any) => {
    if (moodData.length > 0) {
      const matchingMood = moodData?.find(item => {
        console.log('date ', item.date);
        return item?.date === date.toISOString().split('T')[0];
      });
      if (matchingMood?.emoji === 'incredible') {
        return <SentimentVerySatisfiedOutlinedIcon />;
      }
      if (matchingMood?.emoji === 'fine') {
        return <SentimentSatisfiedAltOutlinedIcon />;
      }
      if (matchingMood?.emoji === 'neutral') {
        return <SentimentNeutralOutlinedIcon />;
      }
      if (matchingMood?.emoji === 'sad') {
        return <SentimentDissatisfiedOutlinedIcon />;
      }
      if (matchingMood?.emoji === 'awful') {
        return <SentimentVeryDissatisfiedOutlinedIcon />;
      }
    }
  };

  return (
    <>
      <Calendar selectRange={false} tileContent={renderTileContent} />
    </>
  );
};

export default EmojiCalendar;
