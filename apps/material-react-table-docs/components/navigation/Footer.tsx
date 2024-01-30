import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
import {
  Box,
  Button,
  Divider,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material';
import { Edit, GitHub } from '@mui/icons-material';
import TableOfContentsList from './TableOfContentsList';
import { routes } from './routes';
import { EthicalAd } from '../mdx/EthicalAd';

export const Footer = () => {
  const { pathname } = useRouter();
  const plausible = usePlausible();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '50px',
      }}
    >
      <Button
        color="secondary"
        endIcon={<GitHub />}
        startIcon={<Edit />}
        href={`https://github.com/KevinVandy/material-react-table/edit/v2/apps/material-react-table-docs/pages${pathname}${
          ['/'].includes(pathname)
            ? 'index.tsx'
            : ['/docs', '/docs/api', '/docs/examples', '/docs/guides'].includes(
                  pathname,
                )
              ? '/index.mdx'
              : '.mdx'
        }`}
        onClick={() => plausible('edit-on-github')}
        rel="noopener"
        target="_blank"
        sx={{
          height: '3rem',
          m: '2rem auto',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        variant="outlined"
      >
        Suggest an Edit for this page on GitHub
      </Button>
      <Typography
        variant="subtitle1"
        sx={{
          mt: '2rem',
          textAlign: 'center',
        }}
      >
        Using{' '}
        <MuiLink
          color="secondary"
          href="https://mantine.dev/"
          target="_blank"
          rel="noopener"
        >
          Mantine
        </MuiLink>{' '}
        instead of Material UI?
        <br />
        Check out{' '}
        <MuiLink
          href="https://mantine-react-table.com"
          target="_blank"
          sx={(theme) => ({
            background: `-webkit-linear-gradient(left, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
            display: 'inline',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              textDecorationColor: theme.palette.secondary.main,
            },
          })}
        >
          Mantine&nbsp;React&nbsp;Table
        </MuiLink>
      </Typography>
      <EthicalAd id="footer" text />
      <Typography
        sx={{
          mt: '2rem',
          textAlign: 'center',
        }}
        variant="subtitle2"
      >
        <MuiLink
          sx={{ color: '#6366f1' }}
          target="_blank"
          href={`https://plausible.io/material-react-table.com?${new URLSearchParams(
            { page: pathname },
          ).toString()}`}
        >
          Plausible Analytics
        </MuiLink>{' '}
        for this page
      </Typography>
      <Paper
        elevation={3}
        sx={{
          borderRadius: '8px',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          mt: '50px',
          p: '1.5rem',
        }}
      >
        <Typography color="text.secondary" textAlign="center">
          © {new Date().getFullYear()} Kevin&nbsp;Van&nbsp;Cott
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <MuiLink
            color="text.secondary"
            href="https://www.npmjs.com/package/material-react-table"
            target="_blank"
            rel="noopener"
          >
            NPM
          </MuiLink>
          <MuiLink
            color="text.secondary"
            href="https://github.com/KevinVandy/material-react-table"
            target="_blank"
            rel="noopener"
          >
            Source Code
          </MuiLink>
          <MuiLink
            color="text.secondary"
            href="https://github.com/KevinVandy/material-react-table/issues"
            target="_blank"
            rel="noopener"
          >
            Submit a Bug Report
          </MuiLink>
          <MuiLink
            color="text.secondary"
            href="https://discord.gg/5wqyRx6fnm"
            target="_blank"
            rel="noopener"
          >
            Join&nbsp;the&nbsp;Discord!
          </MuiLink>
          <MuiLink
            color="text.secondary"
            href="https://twitter.com/kevinvancott"
            target="_blank"
            rel="noopener"
          >
            Twitter
          </MuiLink>
        </Box>
        <Divider sx={{ m: '2rem 0' }} />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mt: '1rem',
            gap: '0.5rem',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            justifyContent: {
              xs: 'flex-start',
              sm: 'space-around',
              md: 'space-between',
            },
          }}
        >
          <Box>
            <Typography>Site Directory</Typography>
            <TableOfContentsList items={routes} isFooter />
          </Box>
          <Box>
            <Typography>API Reference</Typography>
            <TableOfContentsList
              items={
                routes.find((item) => item.href === '/docs/getting-started')
                  ?.items ?? []
              }
              isFooter
            />
            <TableOfContentsList
              items={
                routes
                  .find((item) => item.href === '/docs/api')
                  ?.items?.find((item) => item.label === 'Props and Options')
                  ?.secondaryItems ?? []
              }
              isFooter
            />
            <TableOfContentsList
              items={
                routes
                  .find((item) => item.href === '/docs/api')
                  ?.items?.find((item) => item.label === 'Instance APIs')
                  ?.secondaryItems ?? []
              }
              isFooter
            />
            <TableOfContentsList
              items={
                routes
                  .find((item) => item.href === '/docs/api')
                  ?.items?.find((item) => item.label === 'Components and Hooks')
                  ?.secondaryItems ?? []
              }
              isFooter
            />
          </Box>
          <Box>
            <Typography>Examples</Typography>
            <TableOfContentsList
              items={
                routes.find((item) => item.href === '/docs/examples')?.items ??
                []
              }
              isFooter
            />
          </Box>
          <Box>
            <Typography>Guides</Typography>
            {routes
              .find((item) => item.href === '/docs/guides')
              ?.items?.map((item) => (
                <TableOfContentsList
                  key={item.href}
                  items={item?.items ?? []}
                  isFooter
                />
              ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
