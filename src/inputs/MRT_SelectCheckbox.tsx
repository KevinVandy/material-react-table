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
        onClick={(e) => {
          e.stopPropagation();
          checkboxProps?.onClick?.(e);
        }}
        sx={(theme) => ({
          height: density === 'compact' ? '1.75rem' : '2.5rem',
          width: density === 'compact' ? '1.75rem' : '2.5rem',
          m: density !== 'compact' ? '-0.4rem' : undefined,
          ...(checkboxProps?.sx instanceof Function
            ? checkboxProps.sx(theme)
            : (checkboxProps?.sx as any)),
        })}
      />
    </Tooltip>
  );
};
