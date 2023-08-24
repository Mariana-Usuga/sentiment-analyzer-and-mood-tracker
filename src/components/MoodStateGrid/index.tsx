import React from 'react';
import { Grid, Button, IconButton } from '@mui/material';
import { ButtonStates } from '../../models/sentimientState';
import { TitleSentimient } from '../../pages/MoodState/styles';

type MoodButton = {
  key: string;
  color: {
    200: string;
    800: string;
  };
  icon: React.ReactElement;
  label: string;
};

type MoodButtonGridProps = {
  moodButtons: MoodButton[];
  buttonClicked: ButtonStates;
  handleButtonClick: (senti: keyof ButtonStates) => void;
  handleIconButtonClick: (value: string) => void;
};

const MoodButtonGrid: React.FC<MoodButtonGridProps> = ({
  moodButtons,
  buttonClicked,
  handleButtonClick,
  handleIconButtonClick,
}) => {
  return (
    <Grid container>
      {moodButtons.map(button => (
        <Grid item xs={2.4} textAlign='center' key={button.key}>
          <Button
            variant='contained'
            onClick={() => handleButtonClick(button.key)}
            style={{
              backgroundColor: buttonClicked[button.key]
                ? button.color[800]
                : button.color[200],
            }}
          >
            <IconButton onClick={() => handleIconButtonClick(button.key)}>
              {button.icon}
            </IconButton>
          </Button>
          <TitleSentimient>{button.label}</TitleSentimient>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoodButtonGrid;
