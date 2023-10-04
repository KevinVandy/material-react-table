import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import { parseFromValuesOrFunc } from '../column.utils';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  open: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditRowModal = <TData extends Record<string, any>>({
  open,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      localization,
      muiCreateRowModalProps,
      muiEditRowModalProps,
      onCreatingRowCancel,
      onEditingRowCancel,
      renderCreateRowModalContent,
      renderEditRowModalContent,
    },
    setCreatingRow,
    setEditingRow,
  } = table;
  const { creatingRow, editingRow } = getState();
  const row = (creatingRow ?? editingRow) as MRT_Row<TData>;

  const dialogProps = {
    ...parseFromValuesOrFunc(muiEditRowModalProps, { row, table }),
    ...(creatingRow &&
      parseFromValuesOrFunc(muiCreateRowModalProps, { row, table })),
  };

  const internalEditComponents = row
    .getAllCells()
    .filter((cell) => cell.column.columnDef.columnDefType === 'data')
    .map((cell) => (
      <MRT_EditCellTextField
        cell={cell as any}
        key={cell.id}
        table={table as any}
      />
    ));

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={(event, reason) => {
        if (creatingRow) {
          onCreatingRowCancel?.({ row, table });
          setCreatingRow(null);
        } else {
          onEditingRowCancel?.({ row, table });
          setEditingRow(null);
        }
        row._valuesCache = {} as any; //reset values cache
        dialogProps.onClose?.(event, reason);
      }}
      open={open}
      {...dialogProps}
    >
      {((creatingRow &&
        renderCreateRowModalContent?.({
          internalEditComponents,
          row,
          table,
        })) ||
        renderEditRowModalContent?.({
          internalEditComponents,
          row,
          table,
        })) ?? (
        <>
          <DialogTitle sx={{ textAlign: 'center' }}>
            {localization.edit}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <Stack
                sx={{
                  gap: '24px',
                  paddingTop: '16px',
                  width: '100%',
                }}
              >
                {internalEditComponents}
              </Stack>
            </form>
          </DialogContent>
          <DialogActions sx={{ p: '1.25rem' }}>
            <MRT_EditActionButtons row={row} table={table} variant="text" />
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
