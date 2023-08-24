import React from 'react';
import { Snackbar, Alert, SnackbarProps } from '@mui/material';

type CustomSnackbarProps = SnackbarProps & {
  message: string;
};

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  ...snackbarProps
}) => {
  return (
    <Snackbar {...snackbarProps}>
      <Alert severity='warning'>{message}</Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
