import { FC } from 'react';
import { alpha, darken, lighten, useTheme } from '@mui/material';

export const Blockquote: FC<any> = (props) => {
  const theme = useTheme();
  return (
    <blockquote
      style={{
        borderLeft: `solid 8px ${alpha(
          darken(theme.palette.secondary.main, 0.2),
          0.6,
        )}`,
        padding: '0.5rem 1rem',
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        borderRadius: '4px',
        margin: '3rem',
      }}
      {...props}
    />
  );
};
