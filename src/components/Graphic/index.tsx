import { Container } from '@mui/material';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const mockData = [
  { day: '1', emojiv: '0' },
  { day: '2', emojiv: '1' },
  { day: '3', emojiv: '2' },
  { day: '4', emojiv: '3' },
  { day: '5', emojiv: '3' },
  { day: '6', emojiv: '3' },
  { day: '7', emojiv: '3' },
];

const Graphic = () => {
  const tickFormatter = (emoji: any) => {
    console.log('EMO ', emoji);
    if (emoji === 0) return '😭';
    if (emoji === 0.75) return '😞';
    if (emoji === 1.5) return '😐';
    if (emoji === 2.25) return '🙂';
    if (emoji === 3) return '😄';
    else return emoji;
  };

  return (
    <LineChart width={450} height={326} data={mockData}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='day' />
      <YAxis tickFormatter={tickFormatter} />
      <Tooltip />
      <Legend />
      <Line dataKey='emojiv' />
    </LineChart>
  );
};

export default Graphic;
