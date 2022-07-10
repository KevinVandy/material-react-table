import Link from 'next/link';
import { alpha, Box, Button, darken, Stack, Typography } from '@mui/material';
import { HomeCards } from '../components/mdx/HomeCards';
import Summary from '../components/mdx/Summary.mdx';
import { LinkCards } from '../components/mdx/LinkCards';
import { StatBadges } from '../components/mdx/StatBadges';
import ComparisonTable from '../components/mdx/ComparisonTable';
import { LinkHeading } from '../components/mdx/LinkHeading';

const HomePage = () => {
  return (
    <>
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
        <StatBadges />
        <Summary />
        <Box
          sx={{
            m: '2rem auto',
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: {
              xs: '15rem',
              sm: '10rem 10rem',
              md: '10rem 10rem 10rem 10rem',
            },
            '> a': {
              display: 'block',
            },
          }}
        >
          <Link href="/docs/install" passHref>
            <a>
              <Button fullWidth size="large" variant="contained">
                Get Started
              </Button>
            </a>
          </Link>
          <Link href="/docs/api" passHref>
            <a>
              <Button
                fullWidth
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
                API
              </Button>
            </a>
          </Link>
          <Link href="/docs/examples" passHref>
            <a>
              <Button
                fullWidth
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
                Examples
              </Button>
            </a>
          </Link>
          <Link href="/docs/guides" passHref>
            <a>
              <Button
                fullWidth
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
                Guides
              </Button>
            </a>
          </Link>
        </Box>
        <HomeCards />
      </Stack>
      <Typography sx={{ textAlign: 'center', mt: '5rem' }} variant="h3">
        Is{' '}
        <Box
          sx={(theme) => ({
            color: theme.palette.primary.main,
            display: 'inline',
          })}
        >
          {`<MaterialReactTable />`}
        </Box>{' '}
        Right For Your Project?
      </Typography>
      <LinkHeading
        sx={{
          textAlign: 'center',
          m: '2rem',
        }}
        variant="h2"
      >
        Let&apos;s Compare
      </LinkHeading>
      <ComparisonTable />
      <LinkCards />
    </>
  );
};

export default HomePage;
