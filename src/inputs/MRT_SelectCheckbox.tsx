import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row?: MRT_Row;
  selectAll?: boolean;
  instance: MRT_TableInstance;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row, selectAll, instance }) => {
  const {
    getRowModel,
    getSelectedRowModel,
    getState,
    options: {
      localization,
      muiSelectCheckboxProps,
      onHandleSelectRowChange,
      onHandleSelectAllChange,
      selectAllMode,
    },
  } = instance;

  const { isDensePadding } = getState();

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      if (selectAllMode === 'all') {
        instance.getToggleAllRowsSelectedHandler()(event as any);
      } else if (selectAllMode === 'page') {
        instance.getToggleAllPageRowsSelectedHandler()(event as any);
      }
      onHandleSelectAllChange?.({
        event,
        selectedRows: event.target.checked ? getRowModel().flatRows : [],
        instance,
      });
    } else if (row) {
      row?.getToggleSelectedHandler()(event as any);
      onHandleSelectRowChange?.({
        event,
        row,
        selectedRows: event.target.checked
          ? [...getSelectedRowModel().flatRows, row]
          : getSelectedRowModel().flatRows.filter(
              (selectedRow) => selectedRow.id !== row.id,
            ),
        instance,
      });
    }
  };

  const checkboxProps =
    muiSelectCheckboxProps instanceof Function
      ? muiSelectCheckboxProps({ isSelectAll: !!selectAll, row, instance })
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
          selectAll ? instance.getIsAllRowsSelected() : row?.getIsSelected()
        }
        indeterminate={
          selectAll
            ? instance.getIsSomeRowsSelected()
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
