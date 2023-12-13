import { useEffect, useState } from 'react';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { EthicalAd } from '../mdx/EthicalAd';

export const MiniNav = () => {
  const { pathname } = useRouter();
  const isXLDesktop = useMediaQuery('(min-width: 1800px)');

  const [headings, setHeadings] = useState<NodeListOf<HTMLElement>>();

  useEffect(() => {
    setHeadings(
      document.querySelectorAll(isXLDesktop ? 'h2, h3, h4, h5' : 'h3'),
    );
  }, [isXLDesktop, pathname]);

  return (
    <Box
      sx={{
        position: isXLDesktop ? 'fixed' : undefined,
        top: '60px',
        right: '2rem',
        minWidth: '100px',
        maxWidth: isXLDesktop ? '250px' : '500px',
      }}
    >
      <Typography mt="1rem" component="div" variant="h6">
        On This Page
      </Typography>
      <ul
        style={{
          padding: 0,
          maxHeight: isXLDesktop ? 'calc(100vh - 9rem)' : undefined,
          overflowY: isXLDesktop ? 'auto' : undefined,
        }}
      >
        {Array.from(headings ?? []).map((heading, index) => {
          if (
            !isXLDesktop &&
            ['demo', 'source code'].includes(
              heading.innerText.toLowerCase().trim(),
            )
          ) {
            return;
          }
          return (
            <li
              key={index}
              style={{
                listStyle: 'none',
                paddingLeft:
                  heading.localName === 'h3'
                    ? '1rem'
                    : heading.localName === 'h4'
                      ? '2rem'
                      : heading.localName === 'h5'
                        ? '3rem'
                        : 0,
              }}
            >
              <Link
                href={`#${heading.id}`}
                sx={(theme) => ({
                  color:
                    theme.palette.grey[
                      theme.palette.mode === 'dark' ? 400 : 700
                    ],
                })}
              >
                <Typography component="span" variant="subtitle2">
                  {heading.innerText}
                </Typography>
              </Link>
            </li>
          );
        })}
      </ul>
      {isXLDesktop && <EthicalAd id="mini-nav" vertical />}
    </Box>
  );
};
