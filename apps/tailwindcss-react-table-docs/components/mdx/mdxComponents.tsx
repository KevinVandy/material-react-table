import { Typography, Link as MuiLink, Divider } from '@mui/material';
import { Blockquote } from './Blockquote';
import { SampleCodeSnippet } from './SampleCodeSnippet';
import { LinkHeading } from './LinkHeading';
import Link from 'next/link';

export const mdxComponents = {
  a: (props: any) => (
    <Link href={props.href} passHref legacyBehavior>
      <MuiLink
        target={props.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener"
      >
        {props.children}
      </MuiLink>
    </Link>
  ),
  blockquote: (props: any) => <Blockquote {...props} />,
  code: (props: any) => <SampleCodeSnippet {...props} />,
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <LinkHeading variant="h2" {...props} />,
  h3: (props: any) => (
    <LinkHeading variant="h3" sx={{ mt: '3rem' }} {...props} />
  ),
  h4: (props: any) => (
    <LinkHeading variant="h4" sx={{ mt: '2rem' }} {...props} />
  ),
  h5: (props: any) => (
    <LinkHeading variant="h5" sx={{ mt: '2rem' }} {...props} />
  ),
  h6: (props: any) => <Typography variant="h6" {...props} />,
  hr: (props: any) => <Divider sx={{ mb: '1rem' }} {...props} />,
  li: (props: any) => (
    <li className="docsearch-content" {...props}>
      <Typography variant="body1">{props.children}</Typography>
    </li>
  ),
  p: (props: any) => (
    <Typography
      className="docsearch-content"
      sx={{
        textAlign: {
          xs: 'left',
          md: 'justify',
        },
        lineHeight: '1.75rem',
        m: '0.75rem 0',
      }}
      variant="body1"
      {...props}
    />
  ),
};
