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
        href="https://npmjs.com/package/material-react-table"
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
        href="https://github.com/KevinVandy/material-react-table"
        target="_blank_"
      >
        <img
          alt="GitHub Stars"
          src="https://badgen.net/github/stars/KevinVandy/material-react-table?color=blue"
        />
      </a>
      <a
        href="https://github.com/KevinVandy/material-react-table/blob/main/LICENSE"
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt=""
          src="https://badgen.net/github/license/KevinVandy/material-react-table?color=blue"
        />
      </a>
    </Box>
  );
};
