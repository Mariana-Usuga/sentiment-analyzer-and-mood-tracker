import React, { ChangeEvent } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

type RadioGroupControlProps = {
  selectedValue: string;
  onRadioChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroupControl: React.FC<RadioGroupControlProps> = ({
  selectedValue,
  onRadioChange,
}) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='Registrar estado cada dia'
        name='radio-buttons-group'
        value={selectedValue}
        onChange={onRadioChange}
      >
        <FormControlLabel
          value='Registrar mas estados de animo'
          control={<Radio />}
          label='Registrar mas estados de animo'
        />
        <FormControlLabel
          value='Registrar estado cada dia'
          control={<Radio />}
          label='Registrar estado cada dia'
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupControl;
