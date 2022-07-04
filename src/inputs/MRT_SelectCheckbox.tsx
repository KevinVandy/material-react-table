import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row?: MRT_Row;
  selectAll?: boolean;
  table: MRT_TableInstance;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row, selectAll, table }) => {
  const {
    getState,
    options: {
      localization,
      muiSelectCheckboxProps,
      muiSelectAllCheckboxProps,
      selectAllMode,
    },
  } = table;
  const { density } = getState();

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      if (selectAllMode === 'all') {
        table.getToggleAllRowsSelectedHandler()(event as any);
      } else if (selectAllMode === 'page') {
        table.getToggleAllPageRowsSelectedHandler()(event as any);
      }
    } else if (row) {
      row?.getToggleSelectedHandler()(event as any);
    }
  };

  const checkboxProps = selectAll
    ? muiSelectAllCheckboxProps instanceof Function
      ? muiSelectAllCheckboxProps({ table })
      : muiSelectAllCheckboxProps
    : muiSelectCheckboxProps instanceof Function
    ? muiSelectCheckboxProps({ row: row as MRT_Row, table })
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
          selectAll ? table.getIsAllRowsSelected() : row?.getIsSelected()
        }
        indeterminate={
          selectAll ? table.getIsSomeRowsSelected() : row?.getIsSomeSelected()
        }
        inputProps={{
          'aria-label': selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow,
        }}
        onChange={handleSelectChange}
        size={density === 'compact' ? 'small' : 'medium'}
        {...checkboxProps}
        sx={{
          height: density === 'compact' ? '1.75rem' : '2.25rem',
          width: density === 'compact' ? '1.75rem' : '2.25rem',
          ...checkboxProps?.sx,
        }}
      />
    </Tooltip>
  );
};
