import { useEffect, useState } from 'react';
import Link from 'next/link';
import LinkIcon from '@mui/icons-material/Link';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { Typography, IconButton, Tooltip } from '@mui/material';

export const LinkHeading = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [href, setHref] = useState('');

  const id = props.children.toLowerCase().replaceAll(' ', '-');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHref(`${window.location.pathname}#${id}`);
    }
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Typography id={id} {...props}>
      {props.children}{' '}
      <Link href={href} passHref>
        <IconButton
          onClick={handleCopy}
          sx={{
            opacity: 0.5,
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
