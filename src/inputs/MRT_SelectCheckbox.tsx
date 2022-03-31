import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';

interface Props<D extends Record<string, any> = {}> {
  row?: MRT_Row<D>;
  selectAll?: boolean;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row, selectAll }) => {
  const {
    localization,
    muiSelectCheckboxProps,
    onSelectChange,
    onSelectAllChange,
    tableInstance,
    tableInstance: {
      getRowModel,
      getSelectedRowModel,
      getState,
      getToggleAllRowsSelectedProps,
    },
  } = useMRT();

  const { isDensePadding } = getState();

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      getToggleAllRowsSelectedProps?.()?.onChange?.(event as any);
      onSelectAllChange?.(
        event,
        event.target.checked ? getRowModel().flatRows : [],
      );
    } else if (row) {
      row?.getToggleSelectedProps()?.onChange?.(event as any);
      onSelectChange?.(
        event,
        row,
        event.target.checked
          ? [...getSelectedRowModel().flatRows, row]
          : getSelectedRowModel().flatRows.filter(
              (selectedRow) => selectedRow.id !== row.id,
            ),
      );
    }
  };

  const mTableBodyRowSelectCheckboxProps =
    muiSelectCheckboxProps instanceof Function
      ? muiSelectCheckboxProps(selectAll, row, tableInstance)
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
        inputProps={{
          'aria-label': selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow,
        }}
        size={isDensePadding ? 'small' : 'medium'}
        {...checkboxProps}
        onChange={handleSelectChange}
        title={undefined}
      />
    </Tooltip>
  );
};
