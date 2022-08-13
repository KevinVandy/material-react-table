import React, { useMemo } from 'react';
import Link from 'next/link';
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadCrumbLinks.map((link, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: link.split('/').pop()?.replaceAll('-', ' ') || '',
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
      <MuiBreadcrumbs aria-label="breadcrumb" sx={{ pt: '1rem' }}>
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
    </>
  );
};

export default BreadCrumbs;
