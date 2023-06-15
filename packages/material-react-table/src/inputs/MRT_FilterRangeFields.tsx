import Box from '@mui/material/Box';
import { MRT_FilterTextField } from './MRT_FilterTextField';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_FilterRangeFields = ({ header, table }: Props) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      <MRT_FilterTextField header={header} rangeFilterIndex={0} table={table} />
      <MRT_FilterTextField header={header} rangeFilterIndex={1} table={table} />
    </Box>
  );
};
