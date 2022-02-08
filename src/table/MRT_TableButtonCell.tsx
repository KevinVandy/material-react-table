import { styled, TableCell as MuiTableCell } from '@mui/material';

export const MRT_TableButtonCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'densePadding',
})<{ densePadding?: boolean }>(({ densePadding }) => ({
  padding: densePadding ? '1px' : '0.6rem',
  textAlign: 'center',
  transition: 'all 0.2s ease-in-out',
}));
