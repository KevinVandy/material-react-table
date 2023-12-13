import React, { Fragment } from 'react';
import Link from 'next/link';
import { Box, Link as MuiLink } from '@mui/material';
import { LinkHeading } from '../mdx/LinkHeading';
import { type RouteItem } from './routes';

export const TableOfContentsListItem = ({
  item,
  isFooter = false,
}: {
  item: RouteItem;
  isFooter?: boolean;
}) => (
  <li>
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
);
interface Props {
  items: Array<RouteItem>;
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
        {items.map((item, index) => {
          return (
            <Fragment key={index}>
              {item.secondaryItems ? (
                item.secondaryItems.map((item, index) => {
                  return (
                    <TableOfContentsListItem
                      key={index}
                      item={item}
                      isFooter={isFooter}
                    />
                  );
                })
              ) : (
                <TableOfContentsListItem item={item} isFooter={isFooter} />
              )}
            </Fragment>
          );
        })}
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
            {(item.items || item.secondaryItems) && (
              <TableOfContentsList
                items={[
                  ...(item.secondaryItems
                    ? item.secondaryItems
                    : item.items
                      ? item.items
                      : []),
                ]}
              />
            )}
          </Box>
        ))}
      </>
    );
  }
  return <></>;
};

export default TableOfContentsList;
