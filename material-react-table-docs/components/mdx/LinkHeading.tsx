import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LinkIcon from '@mui/icons-material/Link';
import AddLinkIcon from '@mui/icons-material/AddLink';
import {
  IconButton,
  Tooltip,
  Typography,
  TypographyProps,
} from '@mui/material';

interface Props extends TypographyProps {
  children: ReactNode | string;
  tableId?: string;
}

export const LinkHeading: FC<Props> = ({ children, tableId, ...rest }) => {
  const { pathname } = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const id = `${tableId ?? ''}${children
    ?.toString()
    ?.toLowerCase?.()
    ?.replaceAll?.(' ', '-')}`;

  const href = `${pathname}#${id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Typography id={id} {...rest}>
      {children}{' '}
      <Link href={href} passHref>
        <IconButton
          onClick={handleCopy}
          sx={{
            opacity: 0.2,
            transition: 'all 0.2s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Tooltip arrow title={isCopied ? 'Copied!' : 'Copy Link'}>
            {isCopied ? <AddLinkIcon /> : <LinkIcon />}
          </Tooltip>
        </IconButton>
      </Link>
    </Typography>
  );
};
