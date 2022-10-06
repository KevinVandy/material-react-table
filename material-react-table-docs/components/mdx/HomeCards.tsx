import { alpha, Card, CardContent, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const cardData = [
  {
    text: 'High-quality and performant modern table features with a minimal amount of effort',
    image: '/quality.svg',
    alt: 'Quality',
  },
  {
    text: 'Great defaults, with customization treated as a top priority',
    image: '/customizable.svg',
    alt: 'Customizable',
  },
  {
    text: "Easy to opt out of features or UI that you don't need",
    image: '/opt-out.svg',
    alt: 'Easy Opt-out',
  },
  {
    text: 'Efficient bundle size ( 40kb minzipped, including dependencies)',
    image: '/efficient.svg',
    alt: 'Efficient',
  },
];

export const HomeCards = () => {
  return (
    <Stack sx={{ mt: '1rem', gap: '1rem' }}>
      {cardData.map((cd, index) => (
        <Card
          key={index}
          sx={(theme) => ({
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            gap: '1.5rem',
            p: '1rem',
          })}
          variant="outlined"
        >
          <Image src={cd.image} alt={cd.text} height={50} width={50} />
          <Typography
            sx={{
              fontSize: {
                xs: '0.875rem',
                sm: '1rem',
                md: '1.1rem',
                lg: '1.2rem',
              },
            }}
          >
            {cd.text}
          </Typography>
        </Card>
      ))}
    </Stack>
  );
};
