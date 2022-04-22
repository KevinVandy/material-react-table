import { alpha, Box, Card, Typography, useTheme, Link } from '@mui/material';
import Image from 'next/image';

const cardData = [
  {
    name: 'Kevin Van Cott',
    role: 'Maintainer, Developer',
    image: '/contributors/kevinvancott.jpg',
    href: 'https://github.com/KevinVandy',
  },
  {
    name: 'Ryan Kholousi',
    role: 'UI/UX Designer',
    image: '/contributors/ryankholousi.jpeg',
    href: 'https://www.linkedin.com/in/ryan-kholousi-66322979/',
  },
  {
    name: 'Daniel Humphrey',
    role: 'UI/UX, Technical Writer',
    image: '/contributors/danielhumphrey.jpeg',
    href: 'https://www.linkedin.com/in/daniel-humphrey-35945514a/',
  },
];

export const Contributors = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: '4rem',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          p: '1rem 150px 3rem 150px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          '@media(max-width: 900px)': {
            p: '1rem 16px 2rem 16px',
          },
        }}
      >
        {cardData.map((cd, index) => (
          <Link
            key={index}
            href={cd.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <Card
              elevation={4}
              sx={(theme) => ({
                borderRadius: '0.5rem',
                color: theme.palette.primary.dark,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                fontWeight: 'bold',
                minWidth: '200px',
                minHeight: '200px',
                gap: '1rem',
                justifyContent: 'center',
                p: '1rem',
                textAlign: 'center',
                width: '10rem',
                '&:hover': {
                  boxShadow: `1px 4px 8px ${alpha(
                    theme.palette.primary.dark,
                    0.5,
                  )}`,
                  '& img': {
                    transform: 'scale(1.01)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                },
              })}
            >
              <Image
                src={cd.image}
                alt={cd.name}
                width={190}
                height={190}
                objectFit="scale-down"
                style={{ borderRadius: '4px' }}
              />
              <Typography variant="body1">{cd.name}</Typography>
              <Typography variant="body2">{cd.role}</Typography>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
