import { type MouseEvent } from 'react';
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Radio, { type RadioProps } from '@mui/material/Radio';
import { type Theme } from '@mui/material/styles';
import { type MRT_Row, type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends Record<string, any>> {
  row?: MRT_Row<TData>;
  selectAll?: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_SelectCheckbox = <TData extends Record<string, any>>({
  row,
  selectAll,
  table,
}: Props<TData>) => {
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
  const { density, isLoading } = getState();

  const checkboxProps = !row
    ? parseFromValuesOrFunc(muiSelectAllCheckboxProps, { table })
    : parseFromValuesOrFunc(muiSelectCheckboxProps, { row, table });

  const allRowsSelected = selectAll
    ? selectAllMode === 'page'
      ? table.getIsAllPageRowsSelected()
      : table.getIsAllRowsSelected()
    : undefined;

  const commonProps = {
    checked: selectAll ? allRowsSelected : row?.getIsSelected(),
    disabled: isLoading || (row && !row.getCanSelect()),
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
      ...parseFromValuesOrFunc(checkboxProps?.sx, theme),
    }),
    title: undefined,
  } as CheckboxProps | RadioProps;

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
              ? table.getIsSomeRowsSelected() && !allRowsSelected
              : row?.getIsSomeSelected()
          }
          {...commonProps}
        />
      )}
    </Tooltip>
  );
};
