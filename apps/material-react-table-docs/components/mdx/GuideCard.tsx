import React from 'react';
import { alpha, Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

interface Props {
  title: string;
  href: string;
}

export const GuideCard = ({ href, title }) => {
  return (
    <Link href={href}>
      <Card
        elevation={4}
        sx={(theme) => ({
          color: theme.palette.primary.dark,
          '&:hover': {
            boxShadow: `1px 4px 8px ${alpha(theme.palette.primary.dark, 0.5)}`,
          },
        })}
      >
        <CardContent>
          <Typography textAlign="center" component="h4" variant="h5">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
