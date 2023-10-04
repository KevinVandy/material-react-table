import Box from '@mui/material/Box';
import { MRT_RowPinButton } from '../buttons/MRT_RowPinButton';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyRowPinButton = <TData extends Record<string, any>>({
  row,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { enableRowPinning, rowPinningDisplayMode },
  } = table;
  const { density } = getState();

  const canPin = parseFromValuesOrFunc(enableRowPinning, row as any);

  if (!canPin) return null;

  if (rowPinningDisplayMode === 'top-and-bottom' && !row.getIsPinned()) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: density === 'compact' ? 'row' : 'column',
        }}
      >
        <MRT_RowPinButton pinningPosition="top" row={row} table={table} />
        <MRT_RowPinButton pinningPosition="bottom" row={row} table={table} />
      </Box>
    );
  }

  return (
    <MRT_RowPinButton
      pinningPosition={rowPinningDisplayMode === 'bottom' ? 'bottom' : 'top'}
      row={row}
      table={table}
    />
  );
};
