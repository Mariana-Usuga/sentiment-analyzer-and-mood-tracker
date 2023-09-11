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
      const filteredMoods = moodData.filter(item => {
        return item?.date === date.toISOString().split('T')[0];
      });

      const latestMood = filteredMoods[filteredMoods.length - 1];
      const emojiToIcon: Record<string, JSX.Element> = {
        incredible: <SentimentVerySatisfiedOutlinedIcon />,
        fine: <SentimentSatisfiedAltOutlinedIcon />,
        neutral: <SentimentNeutralOutlinedIcon />,
        sad: <SentimentDissatisfiedOutlinedIcon />,
        awful: <SentimentVeryDissatisfiedOutlinedIcon />,
      };

      const moodIcon = latestMood?.emoji ? emojiToIcon[latestMood.emoji] : null;

      return moodIcon;
    }
  };

  return (
    <>
      <Calendar selectRange={false} tileContent={renderTileContent} />
    </>
  );
};

export default EmojiCalendar;
