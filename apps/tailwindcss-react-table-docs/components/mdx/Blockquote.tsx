import { alpha, darken, useMediaQuery, useTheme } from '@mui/material';

export const Blockquote = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 720px)');
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
        margin: isMobile ? '1rem' : '3rem',
      }}
      {...props}
    />
  );
};
