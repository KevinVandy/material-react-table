import Head from 'next/head';
import Link from 'next/link';
import { alpha, Box, Button, darken, Stack, Typography } from '@mui/material';
import { HomeCards } from '../components/mdx/HomeCards';
import Summary from '../components/mdx/Summary.mdx';
import { LinkCards } from '../components/mdx/LinkCards';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Material React Table</title>
        <meta name="description" content="Material React Table Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack sx={{ maxWidth: '80ch', m: 'auto' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: {
              xs: '2rem',
              sm: '3rem',
              md: '4rem',
            },
            fontWeight: 'bold',
            mt: '5rem',
            mb: '2rem',
            lineHeight: {
              xs: '3rem',
              sm: '4rem',
              md: '5rem',
            },
          }}
          variant="h1"
        >
          Welcome To
          <Box sx={(theme) => ({ color: theme.palette.primary.main })}>
            Material React Table
          </Box>
        </Typography>
        <Summary />
        <Box
          sx={{
            m: '2rem auto',
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: {
              xs: 'auto',
              sm: '10rem 10rem',
            },
          }}
        >
          <Link href="/docs/install" passHref>
            <Button size="large" variant="contained">
              Get Started
            </Button>
          </Link>
          <Button
            href="https://github.com/KevinVandy/material-react-table"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            sx={(theme) => ({
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.dark,
              '&:hover': {
                backgroundColor: alpha(
                  darken(theme.palette.primary.main, 0.1),
                  0.2,
                ),
              },
            })}
            variant="contained"
          >
            GitHub
          </Button>
        </Box>
        <HomeCards />
        <LinkCards />
      </Stack>
    </>
  );
};

export default HomePage;
