import { Typography, Link } from '@mui/material';
import { Blockquote } from './Blockquote';
import { SampleCodeSnippet } from './SampleCodeSnippet';

export const mdxComponents = {
  a: (props: any) => <Link target="_blank" {...props} />,
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" {...props} />,
  h4: (props: any) => <Typography variant="h4" {...props} />,
  h5: (props: any) => <Typography variant="h5" {...props} />,
  h6: (props: any) => <Typography variant="h6" {...props} />,
  p: (props: any) => (
    <Typography
      style={{ maxWidth: '120ch', margin: '1.5rem 0' }}
      variant="body1"
      {...props}
    />
  ),
  code: (props: any) => <SampleCodeSnippet {...props} />,
  blockquote: (props: any) => <Blockquote {...props} />,
  li: (props: any) => (
    <li {...props}>
      <Typography variant="body1">{props.children}</Typography>
    </li>
  ),
};
