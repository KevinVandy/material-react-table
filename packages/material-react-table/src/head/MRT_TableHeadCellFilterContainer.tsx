import Collapse, { type CollapseProps } from '@mui/material/Collapse';
import { MRT_FilterCheckbox } from '../inputs/MRT_FilterCheckbox';
import { MRT_FilterRangeFields } from '../inputs/MRT_FilterRangeFields';
import { MRT_FilterRangeSlider } from '../inputs/MRT_FilterRangeSlider';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends CollapseProps {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterContainer = <TData extends MRT_RowData>({
  header,
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: { columnFilterDisplayMode },
  } = table;
  const { showColumnFilters } = getState();
  const { column } = header;
  const { columnDef } = column;

  return (
    <Collapse
      in={showColumnFilters || columnFilterDisplayMode === 'popover'}
      mountOnEnter
      unmountOnExit
      {...rest}
    >
      {columnDef.filterVariant === 'checkbox' ? (
        <MRT_FilterCheckbox column={column} table={table} />
      ) : columnDef.filterVariant === 'range-slider' ? (
        <MRT_FilterRangeSlider header={header} table={table} />
      ) : columnDef.filterVariant?.includes('range') ||
        ['between', 'betweenInclusive', 'inNumberRange'].includes(
          columnDef._filterFn,
        ) ? (
        <MRT_FilterRangeFields header={header} table={table} />
      ) : (
        <MRT_FilterTextField header={header} table={table} />
      )}
    </Collapse>
  );
};
