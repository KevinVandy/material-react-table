import { Components } from '@mui/material';
import { filledInputClasses } from '@mui/material/FilledInput';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { alpha, type Theme } from '@mui/material/styles';

// Import za TypeScript support
import type {} from '@mui/x-date-pickers/themeAugmentation';

export function textField(theme: Theme): Components {
  const color = {
    focused: theme.palette.text.primary,
    active: theme.palette.text.secondary,
    placeholder: theme.palette.text.disabled,
  };

  const font = {
    label: theme.typography.body1,
    value: theme.typography.body2,
  };

  const sharedInputBaseStyles = {
    root: {
      [`&.${inputBaseClasses.disabled}`]: {
        '& svg': {
          color: theme.palette.text.disabled,
        },
      },
    },
    input: {
      ...font.value,
      '&::placeholder': {
        opacity: 1,
        color: color.placeholder,
      },
    },
  };

  const sharedOutlinedInputStyles = {
    root: {
      [`&.${outlinedInputClasses.focused}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: color.focused,
        },
      },
      [`&.${outlinedInputClasses.error}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.palette.error.main,
        },
      },
      [`&.${outlinedInputClasses.disabled}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.palette.action.disabledBackground,
        },
      },
    },
    notchedOutline: {
      borderColor: alpha(theme.palette.grey[500], 0.8),
      transition: theme.transitions.create(['border-color'], {
        duration: theme.transitions.duration.shortest,
      }),
    },
  };

  const sharedFilledInputStyles = {
    root: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
      '&:hover': {
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
      },
      [`&.${filledInputClasses.focused}`]: {
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
      },
      [`&.${filledInputClasses.error}`]: {
        backgroundColor: alpha(theme.palette.error.main, 0.08),
        [`&.${filledInputClasses.focused}`]: {
          backgroundColor: alpha(theme.palette.error.main, 0.16),
        },
      },
      [`&.${filledInputClasses.disabled}`]: {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
  };

  return {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: theme.spacing(1),
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...font.value,
          color: color.placeholder,
          [`&.${inputLabelClasses.shrink}`]: {
            ...font.label,
            fontWeight: 600,
            color: color.active,
            [`&.${inputLabelClasses.focused}`]: {
              color: color.focused,
            },
            [`&.${inputLabelClasses.error}`]: {
              color: theme.palette.error.main,
            },
            [`&.${inputLabelClasses.disabled}`]: {
              color: theme.palette.text.disabled,
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: 'translate(12px, 6px) scale(0.75)',
            },
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: sharedInputBaseStyles,
    },

    MuiPickersInputBase: {
      styleOverrides: sharedInputBaseStyles,
    },

    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.32),
          },
          '&:after': {
            borderBottomColor: color.focused,
          },
        },
      },
    },

    MuiPickersInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.32),
          },
          '&:after': {
            borderBottomColor: color.focused,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: sharedOutlinedInputStyles,
    },

    // 🔥 KLJUČNO RJEŠENJE - Povećan specificity
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          // Osnovni state
          '& .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.grey[500], 0.8),
            transition: theme.transitions.create(['border-color'], {
              duration: theme.transitions.duration.shortest,
            }),
          },
          // Focused state - OVDJE je key!
          [`&.${outlinedInputClasses.focused}:not(.${outlinedInputClasses.error})`]:
            {
              '& .MuiPickersOutlinedInput-notchedOutline': {
                borderColor: color.focused, // Tvoja custom boja umjesto primary
              },
            },
          // Error state
          [`&.${outlinedInputClasses.error}`]: {
            '& .MuiPickersOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main,
            },
          },
          // Disabled state
          [`&.${outlinedInputClasses.disabled}`]: {
            '& .MuiPickersOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: sharedFilledInputStyles,
    },

    MuiPickersFilledInput: {
      styleOverrides: sharedFilledInputStyles,
    },
  };
}
