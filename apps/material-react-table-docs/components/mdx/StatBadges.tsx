import { Box } from '@mui/material';

export const StatBadges = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        m: {
          xs: 0,
          md: '1rem',
        },
        '& img': {
          imageRendering: 'pixelated',
        },
      }}
    >
      <a
        aria-label="NPM Version"
        href="https://npmjs.com/package/material-react-table"
        target="_blank_"
      >
        <img
          alt="NPM Version"
          src="https://badgen.net/npm/v/material-react-table?color=blue"
        />
      </a>
      <a
        aria-label="Number of Downloads"
        href="https://npmtrends.com/material-react-table"
        target="_blank_"
      >
        <img
          alt="Downloads"
          src="https://badgen.net/npm/dt/material-react-table?label=installs&icon=npm&color=blue"
        />
      </a>
      <a
        aria-label="Bundle Size"
        href="https://bundlephobia.com/result?p=material-react-table"
        target="_blank_"
      >
        <img
          alt="Bundle Size"
          src="https://badgen.net/bundlephobia/minzip/material-react-table@latest?color=blue"
        />
      </a>
      <a
        aria-label="GitHub Stars"
        href="https://star-history.com/#kevinvandy/material-react-table&Date"
        target="_blank_"
      >
        <img
          alt="GitHub Stars"
          src="https://badgen.net/github/stars/KevinVandy/material-react-table?color=blue"
        />
      </a>
      <a
        href="https://github.com/KevinVandy/material-react-table/blob/v2/LICENSE"
        target="_blank"
        rel="noopener"
      >
        <img
          alt=""
          src="https://badgen.net/github/license/KevinVandy/material-react-table?color=blue"
        />
      </a>
      <a
        href="https://github.com/sponsors/kevinvandy"
        target="_blank"
        rel="noopener"
      >
        <img alt="" src="https://img.shields.io/badge/sponsor-violet" />
      </a>
    </Box>
  );
};
