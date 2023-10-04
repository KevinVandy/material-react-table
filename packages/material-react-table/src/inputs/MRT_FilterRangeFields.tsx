import Box from '@mui/material/Box';
import { MRT_FilterTextField } from './MRT_FilterTextField';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterRangeFields = <TData extends Record<string, any>>({
  header,
  table,
}: Props<TData>) => {
  return (
    <Box sx={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
      <MRT_FilterTextField header={header} rangeFilterIndex={0} table={table} />
      <MRT_FilterTextField header={header} rangeFilterIndex={1} table={table} />
    </Box>
  );
};
