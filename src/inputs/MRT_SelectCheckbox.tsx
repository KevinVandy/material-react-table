import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';

interface Props<D extends {} = {}> {
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
    tableInstance: { getState },
  } = useMRT();

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      tableInstance?.getToggleAllRowsSelectedProps?.()?.onChange?.(event);
      onSelectAllChange?.(
        event,
        (event.target.checked
          ? tableInstance.getRowModel().flatRows
          : []) as MRT_Row[],
      );
    } else if (row) {
      row?.getToggleRowSelectedProps()?.onChange?.(event);
      onSelectChange?.(
        event,
        row,
        event.target.checked
          ? [...(tableInstance.getSelectedFlatRows() as MRT_Row[]), row]
          : (tableInstance.getSelectedFlatRows() as MRT_Row[]).filter(
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
    ? tableInstance.getToggleAllRowsSelectedProps()
    : row?.getToggleRowSelectedProps();

  const checkboxProps = {
    ...mTableBodyRowSelectCheckboxProps,
    ...rtSelectCheckboxProps,
    style: {
      ...rtSelectCheckboxProps?.style,
      ...mTableBodyRowSelectCheckboxProps?.style,
    },
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
        size={getState().densePadding ? 'small' : 'medium'}
        {...checkboxProps}
        onChange={handleSelectChange}
        title={undefined}
      />
    </Tooltip>
  );
};
