import React, { FC } from 'react';
import Link from 'next/link';
import { Link as MuiLink, Typography } from '@mui/material';
import { LinkHeading } from '../mdx/LinkHeading';

interface Props {
  items: Array<any>;
  variant?: 'list' | 'heading';
}

const TableOfContentsList: FC<Props> = ({ items, variant = 'list' }) => {
  if (variant === 'list') {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <MuiLink sx={{ cursor: 'pointer', lineHeight: '2rem' }}>
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
          <>
            <LinkHeading variant="h3" key={index} href={item.href}>
              {item.label}
            </LinkHeading>
            {item.items && <TableOfContentsList items={item.items} />}
          </>
        ))}
      </>
    );
  }
  return <></>;
};

export default TableOfContentsList;
