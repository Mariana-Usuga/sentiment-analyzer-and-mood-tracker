import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { auth, getUserInfo } from '../../firebase';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import './c.css';
import { Mood } from '../../models/mood';

const EmojiCalendar: React.FC = () => {
  const [moodData, setMoodData] = useState<Mood[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const getUser = await getUserInfo(user?.uid);
        setMoodData(getUser?.moods);
      }
    });
  }, []);

  const renderTileContent = ({ date }: { date: Date }) => {
    if (moodData.length > 0) {
      const matchingMood = moodData?.find(item => {
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
