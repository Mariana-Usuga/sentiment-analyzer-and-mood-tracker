import React, { ChangeEvent, CSSProperties } from 'react';
import Textarea from '@mui/joy/Textarea';
import { TextField } from '@mui/material';

type CustomTextareaProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  customStyle?: CSSProperties;
};

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  value,
  onChange,
  customStyle,
}) => {
  return (
    <Textarea
      minRows={3}
      value={value}
      onChange={onChange}
      variant='outlined'
      color='neutral'
      placeholder='Comentario adicional'
      style={customStyle}
    />
  );
};

export default CustomTextarea;
/***
 * <TextField
      sx={{ minWidth: 500 }}
      value={value}
      onChange={onChange}
      rows={6}
      multiline
      label='Mas Detalles?'
      variant='outlined'
    />
 */
