import Collapse, { type CollapseProps } from '@mui/material/Collapse';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { type ColumnFilterInfo } from '../../utils/column.utils';
import { MRT_FilterCheckbox } from '../inputs/MRT_FilterCheckbox';
import { MRT_FilterRangeFields } from '../inputs/MRT_FilterRangeFields';
import { MRT_FilterRangeSlider } from '../inputs/MRT_FilterRangeSlider';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';

export interface MRT_TableHeadCellFilterContainerProps<
  TData extends MRT_RowData,
> extends CollapseProps {
  columnFilterInfo: ColumnFilterInfo;
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterContainer = <TData extends MRT_RowData>({
  columnFilterInfo,
  header,
  table,
  ...rest
}: MRT_TableHeadCellFilterContainerProps<TData>) => {
  const {
    getState,
    options: { columnFilterDisplayMode },
  } = table;
  const { showColumnFilters } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { isRangeFilter } = columnFilterInfo;

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
      ) : isRangeFilter ? (
        <MRT_FilterRangeFields
          columnFilterInfo={columnFilterInfo}
          header={header}
          table={table}
        />
      ) : (
        <MRT_FilterTextField
          columnFilterInfo={columnFilterInfo}
          header={header}
          table={table}
        />
      )}
    </Collapse>
  );
};
