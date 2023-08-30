import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import { teal, green, lightBlue, orange, red } from '@mui/material/colors';

export const moodButtons = [
  {
    key: 'incredible',
    color: teal,
    icon: <SentimentVerySatisfiedOutlinedIcon style={{ fontSize: '2rem' }} />,
    label: 'Increible',
  },
  {
    key: 'fine',
    color: green,
    icon: <SentimentSatisfiedAltOutlinedIcon style={{ fontSize: '2rem' }} />,
    label: 'Bien',
  },
  {
    key: 'neutral',
    color: lightBlue,
    icon: <SentimentNeutralOutlinedIcon style={{ fontSize: '2rem' }} />,
    label: 'Neutra',
  },
  {
    key: 'sad',
    color: orange,
    icon: <SentimentDissatisfiedOutlinedIcon style={{ fontSize: '2rem' }} />,
    label: 'Mal',
  },
  {
    key: 'awful',
    color: red,
    icon: (
      <SentimentVeryDissatisfiedOutlinedIcon style={{ fontSize: '2rem' }} />
    ),
    label: 'Horrible',
  },
];
