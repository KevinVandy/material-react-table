import { generateUtilityClass, type ButtonProps } from "@mui/material";

// ----------------------------------------------------------------------ć
const loadingButtonClasses = {
  loadingIndicatorStart: generateUtilityClass(
    "MuiLoadingButton",
    "loadingIndicatorStart",
  ),
  loadingIndicatorEnd: generateUtilityClass(
    "MuiLoadingButton",
    "loadingIndicatorEnd",
  ),
};

export function loadingButton() {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
            position: "relative",
            right: 0,
            left: 0,
          },
          ...(ownerState.variant === "soft" && {
            [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
              position: "relative",
            },
            [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
              right: 14,
            },
            ...(ownerState.size === "small" && {
              [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
                position: "relative",
              },
              [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
                right: 10,
              },
            }),
          }),
        }),
      },
    },
  };
}
