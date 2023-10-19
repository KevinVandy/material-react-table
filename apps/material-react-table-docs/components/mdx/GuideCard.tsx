import { alpha, Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

interface Props {
  title: string;
  href: string;
}

export const GuideCard = ({ href, title }: Props) => {
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
          <Typography
            component="h4"
            variant="h5"
            sx={{
              whiteSpace: 'nowrap',
              textAlign: 'center',
              fontSize: '1.2rem',
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
