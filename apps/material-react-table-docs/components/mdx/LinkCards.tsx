import { alpha, Box, Card, Typography, Link } from '@mui/material';
import Image from 'next/image';

const cardData = [
  {
    text: 'NPM',
    image: '/npm.svg',
    href: 'https://www.npmjs.com/package/material-react-table',
  },
  {
    text: 'Source Code',
    image: '/source-code.svg',
    href: 'https://github.com/kevinvandy/material-react-table',
  },
  {
    text: 'GitHub Issues',
    image: '/github-issues.svg',
    href: 'https://github.com/kevinvandy/material-react-table/issues',
  },
  {
    text: 'Discord',
    image: '/discord.svg',
    href: 'https://discord.gg/5wqyRx6fnm',
  },
  {
    text: 'Storybook',
    image: '/storybook.svg',
    href: 'https://material-react-table.dev',
  },
];

export const LinkCards = () => {
  return (
    <Box
      sx={{
        mt: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography sx={{ p: '1rem' }} variant="h3">
        Useful Links
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
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
                alignItems: 'center',
                borderRadius: '0.5rem',
                color: theme.palette.primary.dark,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '90px',
                fontWeight: 'bold',
                gap: '1rem',
                justifyContent: 'center',
                p: '1rem',
                width: '9.5rem',
                '&:hover': {
                  boxShadow: `1px 4px 8px ${alpha(
                    theme.palette.primary.dark,
                    0.5,
                  )}`,
                  '& img': {
                    transform: 'scale(1.01)',
                    transition: 'transform 150ms ease-in-out',
                  },
                },
              })}
            >
              <Image src={cd.image} alt={cd.text} width={60} height={60} />
              <Typography>{cd.text}</Typography>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
