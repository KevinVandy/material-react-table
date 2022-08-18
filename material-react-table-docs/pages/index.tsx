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
              xs: '1.8rem',
              sm: '3rem',
              md: '4rem',
              lg: '4.9rem',
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
          <br />
          <Box
            sx={(theme) => ({
              background: `-webkit-linear-gradient(left, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
              display: 'inline',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            })}
          >
            Material&nbsp;React&nbsp;Table
          </Box>
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: '1.4rem',
              sm: '1.5rem',
              md: '2.2rem',
            },
            mb: '3rem',
            textAlign: 'center',
            lineHeight: '2.25rem',
            fontWeight: 'normal',
          }}
          variant="h2"
        >
          Built with{' '}
          <Link href="https://mui.com/" passHref>
            <MuiLink
              sx={{
                color: (theme) => theme.palette.primary.dark,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
              target="_blank"
              rel="noreferrer"
            >
              Material&nbsp;UI&nbsp;<sup>v5</sup>
            </MuiLink>
          </Link>{' '}
          and&nbsp;
          <Link href="https://tanstack.com/table/v8" passHref>
            <MuiLink
              color="secondary.main"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
              target="_blank"
              rel="noreferrer"
            >
              TanStack&nbsp;Table&nbsp;<sup>v8</sup>
            </MuiLink>
          </Link>
        </Typography>
        <StatBadges />
        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: '1.2rem',
              md: '1.5rem',
            },
            mt: '2rem',
            textAlign: 'center',
            lineHeight: '2.25rem',
            fontWeight: 'normal',
          }}
          variant="h2"
        >
          Quickly create high quality react data tables with
          Material&nbsp;Design
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
          <Link href="/docs/getting-started/install" passHref>
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
            background: `-webkit-linear-gradient(left, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
            display: 'inline',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          &lt;MaterialReactTable&nbsp;/&gt;
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
      <Typography component="p" variant="subtitle2" sx={{ mt: '1rem' }}>
        *If you see any inaccuracies in this table, PRs are welcome!
      </Typography>
      <LinkCards />
    </>
  );
};

export default HomePage;
