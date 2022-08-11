import { Box } from '@mui/material';

export const StatBadges = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        mb: '1rem',
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
        aria-label="Number of Downloads Per Month"
        href="https://npmjs.com/package/material-react-table"
        target="_blank_"
      >
        <img
          alt="Downloads"
          src="https://img.shields.io/npm/dm/material-react-table.svg?color=blue"
        />
      </a>
      <a
        aria-label="GitHub Stars"
        href="https://github.com/KevinVandy/material-react-table"
        target="_blank_"
      >
        <img
          alt="GitHub Stars"
          src="https://img.shields.io/github/stars/KevinVandy/material-react-table.svg?style=social&label=Stars"
        />
      </a>
    </Box>
  );
};
