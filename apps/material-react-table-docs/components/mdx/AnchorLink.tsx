import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export const AnchorLink = (props) => {
  return (
    <Link href={props.href} passHref legacyBehavior>
      <MuiLink
        target={props.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener"
        {...props}
      >
        {props.children}
      </MuiLink>
    </Link>
  );
};
