import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row?: MRT_Row;
  selectAll?: boolean;
  tableInstance: MRT_TableInstance;
}

export const MRT_SelectCheckbox: FC<Props> = ({
  row,
  selectAll,
  tableInstance,
}) => {
  const {
    getRowModel,
    getSelectedRowModel,
    getState,
    options: {
      localization,
      muiSelectCheckboxProps,
      onSelectChange,
      onSelectAllChange,
      selectAllMode,
    },
  } = tableInstance;

  const { isDensePadding } = getState();

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      if (selectAllMode === 'all') {
        tableInstance.getToggleAllRowsSelectedHandler()(event as any);
      } else if (selectAllMode === 'page') {
        tableInstance.getToggleAllPageRowsSelectedHandler()(event as any);
      }
      onSelectAllChange?.({
        event,
        selectedRows: event.target.checked ? getRowModel().flatRows : [],
        tableInstance,
      });
    } else if (row) {
      row?.getToggleSelectedHandler()(event as any);
      onSelectChange?.({
        event,
        row,
        selectedRows: event.target.checked
          ? [...getSelectedRowModel().flatRows, row]
          : getSelectedRowModel().flatRows.filter(
              (selectedRow) => selectedRow.id !== row.id,
            ),
        tableInstance,
      });
    }
  };

  const checkboxProps =
    muiSelectCheckboxProps instanceof Function
      ? muiSelectCheckboxProps({ isSelectAll: !!selectAll, row, tableInstance })
      : muiSelectCheckboxProps;

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={
        selectAll ? localization.toggleSelectAll : localization.toggleSelectRow
      }
    >
      <Checkbox
        checked={
          selectAll
            ? tableInstance.getIsAllRowsSelected()
            : row?.getIsSelected()
        }
        indeterminate={
          selectAll
            ? tableInstance.getIsSomeRowsSelected()
            : row?.getIsSomeSelected()
        }
        inputProps={{
          'aria-label': selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow,
        }}
        onChange={handleSelectChange}
        size={isDensePadding ? 'small' : 'medium'}
        {...checkboxProps}
        sx={{
          height: isDensePadding ? '1.75rem' : '2.25rem',
          width: isDensePadding ? '1.75rem' : '2.25rem',
          ...checkboxProps?.sx,
        }}
      />
    </Tooltip>
  );
};
