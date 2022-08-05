import React, { useMemo } from 'react';
import Link from 'next/link';
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/router';

const BreadCrumbs = () => {
  const { route } = useRouter();

  const breadCrumbLinks = useMemo(() => {
    const routes = route.split('/');
    routes.shift();
    let links: string[] = [];
    for (let i = 0; i < routes.length + 1; i++) {
      if (routes[i] && routes[i] !== '/')
        links.push(`/${routes.slice(0, i + 1).join('/')}`);
    }
    return links;
  }, [route]);

  if (breadCrumbLinks.length === 0) {
    return null;
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ pt: '1rem' }}>
      <Link href={'/'} passHref>
        <MuiLink
          color="inherit"
          sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
          underline="hover"
        >
          {'Home'}
        </MuiLink>
      </Link>
      {breadCrumbLinks.map((link, index) => (
        <Link key={index} href={link} passHref>
          <MuiLink
            color="inherit"
            sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
            underline="hover"
          >
            {link
              .split('/')
              .pop()
              ?.replaceAll('-', ' ')
              ?.replaceAll('css', 'CSS')
              ?.replaceAll(' ui', ' UI')
              ?.replaceAll('api', 'API')}
          </MuiLink>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};

export default BreadCrumbs;
