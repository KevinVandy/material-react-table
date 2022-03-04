import { alpha, Box, Card, Stack, useTheme } from '@mui/material';
import Image from 'next/image';

const cardData = [
  {
    text: 'The perfect mashup of Material-UI and React Table',
    image: '/mashup.svg',
  },
  {
    text: 'High quality and performant modern table features with a minimal amount of effort',
    image: '/quality.svg',
  },
  {
    text: 'Fully customizable with a variety of options',
    image: '/customizable.svg',
  },
  {
    text: "Easy to opt out of features or UI that you don't need",
    image: '/opt-out.svg',
  },
  {
    text: 'Efficient bundle size (currently < 12kb gzipped)',
    image: '/efficient.svg',
  },
];

export const HomeCards = () => {
  const theme = useTheme();

  return (
    <Stack sx={{ mt: '3rem', gap: '1rem' }}>
      {cardData.map((cd, index) => (
        <Card
          key={index}
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            p: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          })}
          variant="outlined"
        >
          <Image src={cd.image} alt={cd.text} height={50} width={50} />

          {cd.text}
        </Card>
      ))}
    </Stack>
  );
};
