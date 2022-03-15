import {
  alpha,
  Box,
  Card,
  Typography,
  useTheme,
  Link,
  CardContent,
} from '@mui/material';
import Image from 'next/image';

const cardData = [
  {
    text: 'NPM',
    image: '/npm.svg',
    alt: 'npm',
    href: 'https://www.npmjs.com/package/material-react-table',
  },
  {
    text: 'Source Code',
    image: '/source-code.svg',
    alt: 'source code',
    href: 'https://github.com/kevinvandy/material-react-table',
  },
  {
    text: 'GitHub Issues',
    image: '/github-issues.svg',
    alt: 'github issues',
    href: 'https://github.com/kevinvandy/material-react-table/issues',
  },
  {
    text: 'Discord',
    image: '/discord.svg',
    alt: 'discord',
    href: 'https://discord.gg/5wqyRx6fnm',
  },
  {
    text: 'Storybook Examples',
    image: '/storybook.svg',
    alt: 'storybook examples',
    href: 'https://material-react-table.dev',
  },
];

export const LinkCards = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        left: '50%',
        ml: 'calc(-50vw)',
        mt: '4rem',
        textAlign: 'center',
        position: 'relative',
        width: '100vw',
      }}
    >
      <Typography sx={{ p: '1rem' }} variant="h3">
        Important Links
      </Typography>
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
              sx={(theme) => ({
                borderRadius: '0.5rem',
                color: theme.palette.primary.dark,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '200px',
                minHeight: '180px',
                fontWeight: 'bold',
                gap: '1rem',
                justifyContent: 'center',
                p: '1rem',
                textAlign: 'center',
                width: '12rem',
                '&:hover': {
                  boxShadow: `4px 4px 16px ${alpha(
                    theme.palette.primary.dark,
                    0.2,
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
                alt={cd.text}
                width={100}
                height={100}
                objectFit="scale-down"
              />
              <CardContent sx={{ whiteSpace: 'nowrap', pb: '0 !important' }}>
                {cd.text}
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
