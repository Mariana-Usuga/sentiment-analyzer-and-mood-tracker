import React from 'react';
import { Grid, Button } from '@mui/material';
import { ButtonStates } from '../../models/sentimientState';
import { TitleSentimient } from '../../pages/MoodState/styles';

type MoodButton = {
  key: string;
  color: {
    100: string;
    600: string;
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
            onClick={() => handleButtonClick(button.key)}
            style={{
              color: buttonClicked[button.key] ? 'white' : button.color[600],
              backgroundColor: buttonClicked[button.key]
                ? button.color[600]
                : 'white',
              border: 'none',
            }}
          >
            {button.icon}
          </Button>
          <TitleSentimient>{button.label}</TitleSentimient>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoodButtonGrid;

/**
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
 *
          backgroundColor: buttonClicked[button.key]
                ? button.color[900]
                : button.color[100],

                              backgroundColor: 'white',

 */
