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
      if (routes[i] && routes[i] !== '/' && routes[i] !== 'about')
        links.push(`/${routes.slice(0, i + 1).join('/')}`);
    }
    return links;
  }, [route]);

  if (breadCrumbLinks.length === 0) {
    return null;
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ pt: '1rem' }}>
      {breadCrumbLinks.map((link, index) => (
        <Link key={index} href={link === route ? '#' : link} passHref>
          <MuiLink color="inherit" sx={{ cursor: 'pointer' }} underline="hover">
            {link.split('/').pop()}
          </MuiLink>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};

export default BreadCrumbs;
