import { type ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LinkIcon from '@mui/icons-material/Link';
import AddLinkIcon from '@mui/icons-material/AddLink';
import {
  IconButton,
  Tooltip,
  Typography,
  type TypographyProps,
  Link as MuiLink,
} from '@mui/material';

interface Props extends TypographyProps {
  children: ReactNode | string;
  tableId?: string;
  href?: string;
}

export const LinkHeading = ({ children, tableId, ...rest }: Props) => {
  const { pathname } = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const id = `${tableId ? `${tableId}-` : ''}${children
    ?.toString()
    ?.toLowerCase?.()
    ?.replaceAll?.(' ', '-')}`?.replaceAll?.('/', '-');

  const href = `${pathname}#${id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Link href={href} passHref legacyBehavior>
      <MuiLink
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <Typography
          className={id.includes('relevant') ? 'relevant' : undefined}
          id={id}
          {...rest}
        >
          {children}{' '}
          <IconButton
            aria-label="Copy link"
            onClick={handleCopy}
            sx={{
              opacity: 0.2,
              transition: 'all 150ms ease',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <Tooltip arrow title={isCopied ? 'Copied!' : 'Copy Link'}>
              {isCopied ? <AddLinkIcon /> : <LinkIcon />}
            </Tooltip>
          </IconButton>
        </Typography>
      </MuiLink>
    </Link>
  );
};
