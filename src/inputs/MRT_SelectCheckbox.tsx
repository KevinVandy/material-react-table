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
    getToggleAllRowsSelectedProps,
    options: {
      isLoading,
      localization,
      muiSelectCheckboxProps,
      onSelectChange,
      onSelectAllChange,
    },
  } = tableInstance;

  const { isDensePadding } = getState();

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      getToggleAllRowsSelectedProps?.()?.onChange?.(event as any);
      onSelectAllChange?.({
        event,
        selectedRows: event.target.checked ? getRowModel().flatRows : [],
        tableInstance,
      });
    } else if (row) {
      row?.getToggleSelectedProps()?.onChange?.(event as any);
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

  const mTableBodyRowSelectCheckboxProps =
    muiSelectCheckboxProps instanceof Function
      ? muiSelectCheckboxProps({ isSelectAll: !!selectAll, row, tableInstance })
      : muiSelectCheckboxProps;

  const rtSelectCheckboxProps = selectAll
    ? getToggleAllRowsSelectedProps()
    : row?.getToggleSelectedProps();

  const checkboxProps = {
    ...rtSelectCheckboxProps,
    ...mTableBodyRowSelectCheckboxProps,
  };

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
        disabled={isLoading}
        inputProps={{
          'aria-label': selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow,
        }}
        size={isDensePadding ? 'small' : 'medium'}
        {...checkboxProps}
        sx={{
          height: isDensePadding ? '1.75rem' : '2.25rem',
          width: isDensePadding ? '1.75rem' : '2.25rem',
        }}
        onChange={handleSelectChange}
        title={undefined}
      />
    </Tooltip>
  );
};
