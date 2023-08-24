import React, { ChangeEvent } from 'react';
import { TextareaAutosize } from '@mui/material';

type CustomTextareaProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

const CustomTextarea: React.FC<CustomTextareaProps> = ({ value, onChange }) => {
  return (
    <TextareaAutosize
      aria-label='empty textarea'
      placeholder='Escribe aquí...'
      minRows={5}
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomTextarea;
