import React, { FC } from 'react';
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

  const checkboxProps = !row
    ? muiSelectAllCheckboxProps instanceof Function
      ? muiSelectAllCheckboxProps({ table })
      : muiSelectAllCheckboxProps
    : muiSelectCheckboxProps instanceof Function
    ? muiSelectCheckboxProps({ row, table })
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
        onChange={
          !row
            ? selectAllMode === 'all'
              ? table.getToggleAllRowsSelectedHandler()
              : table.getToggleAllPageRowsSelectedHandler()
            : row.getToggleSelectedHandler()
        }
        size={density === 'compact' ? 'small' : 'medium'}
        {...checkboxProps}
        sx={{
          height: density === 'compact' ? '1.5rem' : '2rem',
          width: density === 'compact' ? '1.5rem' : '2rem',
          m: '-1re.m',
          ...checkboxProps?.sx,
        }}
      />
    </Tooltip>
  );
};
