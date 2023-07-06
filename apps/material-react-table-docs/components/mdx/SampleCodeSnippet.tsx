import { type CSSProperties, useState } from 'react';
import {
  useTheme,
  Tooltip,
  IconButton,
  styled,
  alpha,
  Paper,
} from '@mui/material';
import { Highlight, themes } from 'prism-react-renderer';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const CopyButton = styled(IconButton)({
  position: 'absolute',
  top: '0.25rem',
  right: '0.25rem',
});

interface Props {
  children: string;
  className?: string;
  enableCopyButton?: boolean;
  style?: CSSProperties;
  margin?: string;
}

export const SampleCodeSnippet = (props: Props) => {
  const theme = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  if (!props.className) {
    return (
      <code
        style={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          padding: '4px',
          margin: '0 0.5ch',
        }}
        {...props}
      />
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        boxShadow: props.enableCopyButton === false ? 'none' : undefined,
        backgroundImage: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <Highlight
        code={props.children}
        language={props.className?.replace?.(/language-/, '') as any}
        theme={theme.palette.mode === 'dark' ? themes.nightOwl : themes.github}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            style={{
              position: 'relative',
              margin:
                props.margin ?? props.enableCopyButton !== false
                  ? '2rem auto'
                  : 0,
              fontSize: '11pt',
            }}
          >
            {props.enableCopyButton !== false && (
              <Tooltip arrow title={isCopied ? 'Copied!' : 'Copy Code'}>
                <CopyButton onClick={handleCopy}>
                  {isCopied ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
                </CopyButton>
              </Tooltip>
            )}
            <pre
              className={className}
              style={{
                ...style,
                minHeight: '3rem',
                overflowX: 'auto',
                padding: '1rem 2.5rem 0 1rem',
                ...props?.style,
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    </Paper>
  );
};
