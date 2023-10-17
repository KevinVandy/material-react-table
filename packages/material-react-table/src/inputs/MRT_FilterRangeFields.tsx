import Box, { type BoxProps } from '@mui/material/Box';
import { MRT_FilterTextField } from './MRT_FilterTextField';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends BoxProps {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterRangeFields = <TData extends MRT_RowData>({
  header,
  table,
  ...rest
}: Props<TData>) => {
  return (
    <Box
      {...rest}
      sx={(theme) => ({
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: '1fr 1fr',
        ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
      })}
    >
      <MRT_FilterTextField header={header} rangeFilterIndex={0} table={table} />
      <MRT_FilterTextField header={header} rangeFilterIndex={1} table={table} />
    </Box>
  );
};
