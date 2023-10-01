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
        <MRT_RowPinButton row={row} table={table} pinningPosition="top" />
        <MRT_RowPinButton row={row} table={table} pinningPosition="bottom" />
      </Box>
    );
  }

  return (
    <MRT_RowPinButton
      row={row}
      table={table}
      pinningPosition={rowPinningDisplayMode === 'bottom' ? 'bottom' : 'top'}
    />
  );
};
