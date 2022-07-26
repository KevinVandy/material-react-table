import Link from 'next/link';
import {
  alpha,
  Box,
  Button,
  darken,
  Stack,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { HomeCards } from '../components/mdx/HomeCards';
import { LinkCards } from '../components/mdx/LinkCards';
import { StatBadges } from '../components/mdx/StatBadges';
import ComparisonTable from '../components/mdx/ComparisonTable';
import { LinkHeading } from '../components/mdx/LinkHeading';
import FeatureTable from '../components/mdx/FeatureTable';

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
              lg: '5rem',
            },
            fontWeight: 'bold',
            mt: '5rem',
            mb: {
              xs: '1rem',
              md: '1.5rem',
              lg: '2rem',
            },
            lineHeight: {
              xs: '3rem',
              sm: '4rem',
              md: '5rem',
              lg: '6rem',
            },
          }}
          variant="h1"
        >
          Welcome To
          <Box sx={(theme) => ({ color: theme.palette.primary.main })}>
            Material React Table
          </Box>
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: '1.2rem',
              md: '1.4rem',
            },
            mb: '2rem',
            textAlign: 'center',
            lineHeight: '2.25rem',
            fontWeight: 'normal',
          }}
          variant="h2"
        >
          Quickly Create High Quality React Data Tables with{' '}
          <Box
            sx={{
              fontStyle: 'italic',
            }}
          >
            Material&nbsp;Design
          </Box>
        </Typography>
        <StatBadges />
        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: '1.5rem',
              md: '2rem',
            },
            mt: '2rem',
            mb: '1rem',
            textAlign: 'center',
            lineHeight: '2.25rem',
            fontWeight: 'normal',
          }}
          variant="h2"
        >
          Built on{' '}
          <Box display="inline" color="secondary.main">
            TanStack Table
          </Box>{' '}
          &amp;{' '}
          <Box display="inline" color="primary.main">
            Material UI
          </Box>
        </Typography>
        <Typography color="text.secondary" m="0.5rem auto">
          Material React Table is a fully featured{' '}
          <Link href="https://mui.com/" passHref>
            <MuiLink color="inherit" target="_blank" rel="noreferrer">
              Material&nbsp;UI&nbsp;V5
            </MuiLink>
          </Link>{' '}
          implementation of{' '}
          <Link href="https://tanstack.com/table/v8" passHref>
            <MuiLink color="inherit" target="_blank" rel="noreferrer">
              TanStack&nbsp;Table&nbsp;V8
            </MuiLink>
          </Link>
          , written from the ground up in TypeScript.
        </Typography>
        <Box
          sx={{
            m: '3rem auto',
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: {
              xs: '15rem',
              sm: '14rem 14rem',
              md: '16rem 16rem',
              lg: '12rem 11rem 11rem 11rem',
            },
            '> a': {
              display: 'block',
            },
          }}
        >
          <Link href="/docs/install" passHref>
            <a>
              <Button
                endIcon={<ArrowForwardIos />}
                fullWidth
                size="large"
                variant="contained"
              >
                Get Started
              </Button>
            </a>
          </Link>
          <Link href="/docs/api" passHref>
            <a>
              <Button
                endIcon={<ArrowForwardIos />}
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
                endIcon={<ArrowForwardIos />}
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
                endIcon={<ArrowForwardIos />}
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
        color="text.secondary"
        sx={{
          textAlign: 'center',
          m: '2rem',
        }}
        variant="h4"
      >
        Let&apos;s Compare
      </LinkHeading>
      <ComparisonTable />
      <LinkHeading
        color="text.secondary"
        sx={{
          textAlign: 'center',
          m: '2rem',
        }}
        variant="h4"
      >
        Feature Comparison
      </LinkHeading>
      <FeatureTable />
      <Typography variant="subtitle2" sx={{ mt: '1rem' }}>
        *If you see any inaccuracies in this table, PRs are welcome!
      </Typography>
      <LinkCards />
    </>
  );
};

export default HomePage;
