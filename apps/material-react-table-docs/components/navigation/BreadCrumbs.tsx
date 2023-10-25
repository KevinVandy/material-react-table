import { useMemo } from 'react';
import Link from 'next/link';
import {
  Box,
  IconButton,
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Tooltip,
} from '@mui/material';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowBack } from '@mui/icons-material';

export const BreadCrumbs = () => {
  const { route, back } = useRouter();

  const breadCrumbLinks = useMemo(() => {
    const routes = route.split('/');
    routes.shift();
    const links: string[] = [];
    for (let i = 0; i < routes.length + 1; i++) {
      if (routes[i] && routes[i] !== '/')
        links.push(`/${routes.slice(0, i + 1).join('/')}`);
    }
    return links;
  }, [route]);

  if (breadCrumbLinks.length === 0) {
    return null;
  }

  if (breadCrumbLinks.length === 1) {
    breadCrumbLinks.unshift('/');
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadCrumbLinks.map((link, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name:
        link === '/'
          ? 'Home'
          : link.split('/').pop()?.replaceAll('-', ' ') || '',
      item: `https://www.material-react-table.com${link}`,
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: '1rem', pt: '1rem' }}
      >
        <Tooltip title="Go Back">
          <IconButton
            aria-label="Go Back"
            color="default"
            onClick={back}
            size="small"
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <MuiBreadcrumbs aria-label="breadcrumb" sx={{ m: 0 }}>
          {breadCrumbLinks.map((link, index) => (
            <Link key={index} href={link} passHref legacyBehavior>
              <MuiLink
                color="inherit"
                sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                underline="hover"
              >
                {link === '/'
                  ? 'Home'
                  : link
                      .split('/')
                      .pop()
                      ?.replaceAll('-', ' ')
                      ?.replaceAll('mrt', 'MRT')
                      ?.replaceAll('css', 'CSS')
                      ?.replaceAll(' ui', ' UI')
                      ?.replaceAll('api', 'API')}
              </MuiLink>
            </Link>
          ))}
        </MuiBreadcrumbs>
      </Box>
    </>
  );
};
