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
import { GuideCard } from '../components/mdx/GuideCard';
import { ComparisonTable } from '../components/mdx/ComparisonTable';
import { LinkHeading } from '../components/mdx/LinkHeading';
import { FeatureTable } from '../components/mdx/FeatureTable';
import { Contributors } from '../components/mdx/Contributors';
import { InstallCommand } from '../components/mdx/InstallCommand';
import BasicExamples from '../example-groups/BasicExamples';

const HomePage = () => {
  return (
    <>
      <Stack sx={{ maxWidth: '1200px', m: 'auto' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: {
              xs: '1.8rem',
              sm: '3rem',
              md: '4rem',
              lg: '4.5rem',
              xl: '5rem',
            },
            fontWeight: 'bold',
            mt: '4rem',
            lineHeight: {
              xs: '2.5rem',
              sm: '3.5rem',
              md: '4rem',
              lg: '5rem',
              xl: '5.25rem',
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
            <Box
              component="sup"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.2rem',
                  md: '1.5rem',
                  lg: '2.5rem',
                },
              }}
            >
              V2
            </Box>
          </Box>
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: '1.2rem',
              sm: '1.5rem',
              md: '2.2rem',
              lg: '2.25rem',
            },
            mb: '1rem',
            textAlign: 'center',
            lineHeight: '2.25rem',
            fontWeight: 'normal',
          }}
          variant="h2"
        >
          Built with{' '}
          <Link href="https://mui.com/" passHref legacyBehavior>
            <MuiLink
              sx={{
                color: (theme) => theme.palette.primary.dark,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
              target="_blank"
              rel="noopener"
            >
              Material&nbsp;UI<sup>V5</sup>
            </MuiLink>
          </Link>{' '}
          and&nbsp;
          <Link href="https://tanstack.com/table/v8" passHref legacyBehavior>
            <MuiLink
              color="secondary.main"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
              target="_blank"
              rel="noopener"
            >
              TanStack&nbsp;Table<sup>V8</sup>
            </MuiLink>
          </Link>
        </Typography>
        <StatBadges />
        <Box
          sx={{
            m: '1rem auto',
            display: 'grid',
            gap: '1.5rem',
            width: '100%',
            justifyContent: 'center',
            gridTemplateColumns: {
              xs: '15rem',
              sm: '14rem 14rem',
              md: '16rem 16rem',
              lg: '12rem 11rem 11rem 11rem',
              xl: '1fr 1fr 1fr 1fr',
            },
            '> a': {
              display: 'block',
            },
          }}
        >
          <Link href="/docs/getting-started/install" passHref>
            <Button
              endIcon={<ArrowForwardIos />}
              fullWidth
              size="large"
              variant="contained"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/docs/api" passHref>
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
          </Link>
          <Link href="/docs/examples" passHref>
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
          </Link>
          <Link href="/docs/guides" passHref>
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
          </Link>
        </Box>
        <Box>
          <InstallCommand centered variant="fullWidth" />
        </Box>
        <HomeCards />
        <Typography my="2rem" textAlign="center" variant="h3">
          Popular Docs
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              md: '1fr 1fr 1fr 1fr',
              sm: '1fr 1fr',
            },
            gap: '1rem',
          }}
        >
          <GuideCard
            title="Best Practices"
            href="/docs/guides/best-practices"
          />
          <GuideCard title="Table Options" href="/docs/api/table-options" />
          <GuideCard title="Advanced Example" href="docs/examples/advanced" />
          <GuideCard
            title="Fetching Example"
            href="docs/examples/react-query"
          />
          <GuideCard title="Localization" href="docs/guides/localization" />
          <GuideCard title="Create Columns" href="docs/guides/data-columns" />
          <GuideCard
            title="Column Filtering"
            href="docs/guides/column-filtering"
          />
          <GuideCard title="Selection" href="docs/guides/row-selection" />
        </Box>
      </Stack>
      <Typography my="2rem" textAlign="center" variant="h3">
        Examples To Get You Started
      </Typography>
      <BasicExamples />
      <Typography
        sx={{
          textAlign: 'center',
          mt: '5rem',
          fontSize: { xs: '1.5rem', md: '2rem', xl: '2.5rem' },
        }}
        variant="h3"
      >
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
      <LinkHeading mt="4rem" textAlign="center" variant="h3">
        Maintainers and Contributors
      </LinkHeading>
      <Contributors />
      <LinkCards />
    </>
  );
};

export default HomePage;
