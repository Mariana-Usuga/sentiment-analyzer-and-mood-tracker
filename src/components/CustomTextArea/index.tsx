import React, { ChangeEvent } from 'react';
import Textarea from '@mui/joy/Textarea';
import { TextField } from '@mui/material';

type CustomTextareaProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

const CustomTextarea: React.FC<CustomTextareaProps> = ({ value, onChange }) => {
  return (
    <TextField
      sx={{ minWidth: 500 }}
      value={value}
      onChange={onChange}
      rows={6}
      multiline
      label='Mas Detalles?'
      variant='outlined'
    />
  );
};

export default CustomTextarea;
