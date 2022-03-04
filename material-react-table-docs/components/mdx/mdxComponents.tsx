import { Typography, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import { Blockquote } from './Blockquote';
import { SampleCodeSnippet } from './SampleCodeSnippet';
import { LinkHeading } from './LinkHeading';

export const mdxComponents = {
  a: (props: any) => <MuiLink target="_blank" rel="noreferrer" {...props} />,
  blockquote: (props: any) => <Blockquote {...props} />,
  code: (props: any) => <SampleCodeSnippet {...props} />,
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <LinkHeading variant="h2" {...props} />,
  h3: (props: any) => <LinkHeading variant="h3" {...props} />,
  h4: (props: any) => <LinkHeading variant="h4" {...props} />,
  h5: (props: any) => <Typography variant="h5" {...props} />,
  h6: (props: any) => <Typography variant="h6" {...props} />,
  img: (props: any) => (
    <Image
      alt="avatar"
      height={200}
      width={200}
      objectFit="scale-down"
      {...props}
    />
  ),
  li: (props: any) => (
    <li {...props}>
      <Typography variant="body1">{props.children}</Typography>
    </li>
  ),
  p: (props: any) => (
    <Typography
      sx={{
        textAlign: {
          xs: 'left',
          md: 'justify',
        },
        m: '1.5rem 0',
      }}
      variant="body1"
      {...props}
    />
  ),
};
