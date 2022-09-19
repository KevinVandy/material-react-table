import React, { FC, MouseEvent } from 'react';
import { Checkbox, Tooltip, Radio, Theme } from '@mui/material';
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
      enableMultiRowSelection,
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

  const commonProps = {
    checked: selectAll
      ? selectAllMode === 'page'
        ? table.getIsAllPageRowsSelected()
        : table.getIsAllRowsSelected()
      : row?.getIsSelected(),
    inputProps: {
      'aria-label': selectAll
        ? localization.toggleSelectAll
        : localization.toggleSelectRow,
    },
    onChange: row
      ? row.getToggleSelectedHandler()
      : selectAllMode === 'all'
      ? table.getToggleAllRowsSelectedHandler()
      : table.getToggleAllPageRowsSelectedHandler(),
    size: (density === 'compact' ? 'small' : 'medium') as 'small' | 'medium',
    ...checkboxProps,
    onClick: (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      checkboxProps?.onClick?.(e);
    },
    sx: (theme: Theme) => ({
      height: density === 'compact' ? '1.75rem' : '2.5rem',
      width: density === 'compact' ? '1.75rem' : '2.5rem',
      m: density !== 'compact' ? '-0.4rem' : undefined,
      ...(checkboxProps?.sx instanceof Function
        ? checkboxProps.sx(theme)
        : (checkboxProps?.sx as any)),
    }),
    title: undefined,
  };

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={
        checkboxProps?.title ??
        (selectAll
          ? localization.toggleSelectAll
          : localization.toggleSelectRow)
      }
    >
      {enableMultiRowSelection === false ? (
        <Radio {...commonProps} />
      ) : (
        <Checkbox
          indeterminate={
            selectAll
              ? table.getIsSomeRowsSelected() &&
                !(selectAllMode === 'page'
                  ? table.getIsAllPageRowsSelected()
                  : table.getIsAllRowsSelected())
              : row?.getIsSomeSelected()
          }
          {...commonProps}
        />
      )}
    </Tooltip>
  );
};
