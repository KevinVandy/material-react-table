import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';

interface Props {
  id: string;
  sticky?: boolean;
  vertical?: boolean;
  text?: boolean;
}

export const EthicalAd = ({ id, sticky, text, vertical }: Props) => {
  const theme = useTheme();

  if (process.env.NODE_ENV === 'development') return null;

  return (
    <Box
      className={`${theme.palette.mode} ${
        vertical ? 'vertical' : 'horizontal'
      } raised`}
      data-ea-publisher="material-react-tablecom"
      data-ea-type={text ? 'text' : 'image'}
      id={id}
      data-ea-style={sticky ? 'stickybox' : undefined}
      sx={{ display: 'block', textAlign: 'center', m: '1rem auto' }}
      suppressHydrationWarning
    />
  );
};
