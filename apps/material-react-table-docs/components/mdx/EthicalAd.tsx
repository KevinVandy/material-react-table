import { Box, useTheme } from '@mui/material';

interface Props {
  compact?: boolean;
  id: string;
  sticky?: boolean;
  text?: boolean;
  vertical?: boolean;
}

export const EthicalAd = ({ compact, id, sticky, text, vertical }: Props) => {
  const theme = useTheme();

  if (process.env.NODE_ENV === 'development') return null;

  return (
    <Box
      className={`${theme.palette.mode} ${
        vertical ? 'vertical' : 'horizontal'
      } raised bordered`}
      data-ea-keywords="javascript|typescript|react|opensource|frontend|accessibility|material"
      data-ea-publisher="material-react-tablecom"
      data-ea-type={text ? 'text' : 'image'}
      id={id}
      data-ea-style={sticky ? 'stickybox' : undefined}
      sx={{
        display: 'flex !important',
        justifyContent: 'center',
        textAlign: 'center',
        m: compact ? '-13px' : '1rem auto',
      }}
      suppressHydrationWarning
    />
  );
};
