import { Container } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { auth, getUserInfo } from '../../fireabse';

const Graphic = () => {
  const [moodData, setMoodData] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const getUser = await getUserInfo(user?.uid);
        const newArray = getUser?.moods?.map((item: any) => ({
          day: new Date(item.date).getDate() + 1, // Obtiene el día de la fecha
          emojiScale: item.feelingScale,
        }));
        setMoodData(newArray);
      }
    });
  }, []);

  const tickFormatter = (emoji: any) => {
    if (emoji === 1) return '😭';
    if (emoji === 2) return '😞';
    if (emoji === 3) return '😐';
    if (emoji === 4) return '🙂';
    if (emoji === 5) return '😄';
    else return emoji;
  };

  return (
    <LineChart width={450} height={326} data={moodData}>
      <CartesianGrid strokeDasharray='5 2' />
      <XAxis dataKey='day' />
      <YAxis tickFormatter={tickFormatter} domain={[1, 5]} />
      <Tooltip />
      <Legend />
      <Line dataKey='emojiScale' key='emotion' />
    </LineChart>
  );
};

export default Graphic;
