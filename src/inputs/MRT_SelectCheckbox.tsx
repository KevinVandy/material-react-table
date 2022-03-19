import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';

interface Props {
  row?: MRT_Row;
  selectAll?: boolean;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row, selectAll }) => {
  const { localization, onRowSelectChange, onSelectAllChange, tableInstance } =
    useMRT();

  const onSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      tableInstance?.getToggleAllRowsSelectedProps?.()?.onChange?.(event);
      if (event.target.checked) {
        onSelectAllChange?.(event, tableInstance.rows);
      } else {
        onSelectAllChange?.(event, []);
      }
    } else if (row) {
      row?.getToggleRowSelectedProps()?.onChange?.(event);
      if (event.target.checked) {
        onRowSelectChange?.(event, row, [
          ...tableInstance.selectedFlatRows,
          row,
        ]);
      } else {
        onRowSelectChange?.(
          event,
          row,
          tableInstance.selectedFlatRows.filter(
            (selectedRow) => selectedRow.id !== row.id,
          ),
        );
      }
    }
  };

  const checkboxProps = selectAll
    ? tableInstance.getToggleAllRowsSelectedProps()
    : row?.getToggleRowSelectedProps();

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
        {...checkboxProps}
        onChange={onSelectChange}
        title={undefined}
      />
    </Tooltip>
  );
};
