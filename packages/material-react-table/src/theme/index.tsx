import CssBaseline from '@mui/material/CssBaseline';
import { hrHR, type Localization } from '@mui/material/locale';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  type ThemeOptions,
} from '@mui/material/styles';
import merge from 'lodash/merge';
import { useMemo, useState } from 'react';

import { customShadows } from './custom-shadows';
import { createContrast } from './options/contrast';
import { createPresets } from './options/presets';
// options
import RTL from './options/right-to-left';
import { componentsOverrides } from './overrides';

// system
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
};

export default function ThemeProvider({ children, mode = 'light' }: Props) {
  const [selectedLanguage, _setSelectedLanguage] = useState<Localization>(hrHR);

  const presets = createPresets('default');

  const contrast = createContrast('default', mode);

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(mode),
        ...presets.palette,
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows(mode),
        ...presets.customShadows,
      },
      direction: 'ltr',
      shadows: shadows(mode),
      shape: { borderRadius: 8 },
      typography,
      components: {
        MuiTooltip: {
          defaultProps: {
            slotProps: {
              popper: {
                modifiers: [{ name: 'offset', options: { offset: [0, -16] } }],
              },
            },
          },
        },
        MuiDataGrid: {
          styleOverrides: {
            root: {
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-cell:focus-within': {
                outline: 'none',
              },
            },
          },
        },
      },
      zIndex: {
        snackbar: 999999,
      },
    }),
    [presets.palette, presets.customShadows, contrast.palette, mode],
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(
    componentsOverrides(theme),
    contrast.components,
    selectedLanguage.components,
  );

  return (
    <MuiThemeProvider theme={theme}>
      <RTL themeDirection="ltr">
        <CssBaseline />
        {children}
      </RTL>
    </MuiThemeProvider>
  );
}
