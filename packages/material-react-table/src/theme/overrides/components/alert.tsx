import { type AlertProps, alertClasses } from '@mui/material/Alert';
import { type Components, type Theme, alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

const COLORS = ['info', 'success', 'warning', 'error'] as const;

// ----------------------------------------------------------------------

export function alert(theme: Theme): Components {
  const lightMode = theme.palette.mode === 'light';

  const rootStyles = (ownerState: AlertProps) => {
    const standardVariant = ownerState.variant === 'standard';

    const filledVariant = ownerState.variant === 'filled';

    const outlinedVariant = ownerState.variant === 'outlined';

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.severity === color && {
        // STANDARD
        ...(standardVariant && {
          color: theme.palette[color][lightMode ? 'darker' : 'lighter'],
          backgroundColor:
            theme.palette[color][lightMode ? 'lighter' : 'darker'],
          [`& .${alertClasses.icon}`]: {
            color: theme.palette[color][lightMode ? 'main' : 'light'],
          },
        }),
        // FILLED
        ...(filledVariant && {
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
        }),
        // OUTLINED
        ...(outlinedVariant && {
          backgroundColor: alpha(theme.palette[color].main, 0.08),
          color: theme.palette[color][lightMode ? 'dark' : 'light'],
          border: `solid 1px ${alpha(theme.palette[color].main, 0.16)}`,
          [`& .${alertClasses.icon}`]: {
            color: theme.palette[color].main,
          },
        }),
      }),
    }));

    return [...colorStyle];
  };

  return {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: AlertProps }) =>
          rootStyles(ownerState),
        icon: {
          opacity: 1,
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          marginBottom: theme.spacing(0.5),
          fontWeight: theme.typography.fontWeightSemiBold,
        },
      },
    },
  };
}
