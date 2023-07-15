import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
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
      onEditingRowCancel,
      onCreatingRowCancel,
      renderEditRowModalContent,
      renderCreateRowModalContent,
      muiCreateRowModalProps,
      muiEditRowModalProps,
    },
    setEditingRow,
    setCreatingRow,
  } = table;
  const { creatingRow, editingRow } = getState();
  const row = (creatingRow ?? editingRow) as MRT_Row<TData>;

  const createModalProps =
    muiCreateRowModalProps instanceof Function
      ? muiCreateRowModalProps({ row, table })
      : muiCreateRowModalProps;

  const editModalProps =
    muiEditRowModalProps instanceof Function
      ? muiEditRowModalProps({ row, table })
      : muiEditRowModalProps;

  const dialogProps = {
    ...editModalProps,
    ...(creatingRow && createModalProps),
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
      onClose={() => {
        if (creatingRow) {
          onCreatingRowCancel?.({ row, table });
          setCreatingRow(null);
        } else {
          onEditingRowCancel?.({ row, table });
          setEditingRow(null);
        }
      }}
      open={open}
      {...dialogProps}
    >
      {((creatingRow &&
        renderCreateRowModalContent?.({
          row,
          table,
          internalEditComponents,
        })) ||
        renderEditRowModalContent?.({
          row,
          table,
          internalEditComponents,
        })) ?? (
        <>
          <DialogTitle sx={{ textAlign: 'center' }}>
            {(creatingRow && localization.create) || localization.edit}
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
