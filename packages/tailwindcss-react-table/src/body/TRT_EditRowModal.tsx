import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { TRT_EditActionButtons } from '../buttons/TRT_EditActionButtons';
import { TRT_EditCellTextField } from '../inputs/TRT_EditCellTextField';
import type {
  TRT_Row,
  TRT_TableInstance,
} from '../TailwindCSSReactTable.types';

interface Props<TData extends Record<string, any> = {}> {
  open: boolean;
  row: TRT_Row<TData>;
  table: TRT_TableInstance<TData>;
}

export const TRT_EditRowModal = <TData extends Record<string, any> = {}>({
  open,
  row,
  table,
}: Props<TData>) => {
  const {
    options: { localization },
  } = table;

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">{localization.edit}</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              gap: '1.5rem',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              pt: '1rem',
              width: '100%',
            }}
          >
            {row
              .getAllCells()
              .filter((cell) => cell.column.columnDef.columnDefType === 'data')
              .map((cell) => (
                <TRT_EditCellTextField
                  cell={cell as any}
                  key={cell.id}
                  showLabel
                  table={table as any}
                />
              ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <TRT_EditActionButtons row={row} table={table} variant="text" />
      </DialogActions>
    </Dialog>
  );
};
