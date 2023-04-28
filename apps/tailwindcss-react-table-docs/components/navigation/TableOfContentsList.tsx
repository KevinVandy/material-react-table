import React from 'react';
import Link from 'next/link';
import { Box, Link as MuiLink } from '@mui/material';
import { LinkHeading } from '../mdx/LinkHeading';

interface Props {
  items: Array<any>;
  isFooter?: boolean;
  variant?: 'list' | 'heading';
}

const TableOfContentsList = ({
  items,
  isFooter = false,
  variant = 'list',
}: Props) => {
  if (variant === 'list') {
    return (
      <ul
        style={{
          listStyle: isFooter ? 'none' : undefined,
          padding: isFooter ? 0 : undefined,
        }}
      >
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.href} passHref legacyBehavior>
              <MuiLink
                sx={{
                  color: isFooter ? 'text.secondary' : 'primary.main',
                  cursor: 'pointer',
                  lineHeight: isFooter ? '1.6rem' : '2rem',
                  fontSize: isFooter ? '0.9rem' : '1.2rem',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.label}
              </MuiLink>
            </Link>
          </li>
        ))}
      </ul>
    );
  } else if (variant === 'heading') {
    return (
      <>
        {items.map((item, index) => (
          <Box key={index}>
            <LinkHeading variant="h3" href={item.href}>
              {item.label}
            </LinkHeading>
            {item.items && <TableOfContentsList items={item.items} />}
          </Box>
        ))}
      </>
    );
  }
  return <></>;
};

export default TableOfContentsList;
