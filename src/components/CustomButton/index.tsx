import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

type CustomButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode; // Añadir esta línea
};

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <Button
      variant='outlined'
      style={{ marginRight: '20px' }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
