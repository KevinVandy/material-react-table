import { type MouseEvent } from 'react';
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import Radio, { type RadioProps } from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import { type Theme } from '@mui/material/styles';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends CheckboxProps {
  row?: MRT_Row<TData>;
  selectAll?: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_SelectCheckbox = <TData extends MRT_RowData>({
  row,
  selectAll,
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableMultiRowSelection,
      enableRowPinning,
      localization,
      muiSelectAllCheckboxProps,
      muiSelectCheckboxProps,
      rowPinningDisplayMode,
      selectAllMode,
    },
  } = table;
  const { density, isLoading } = getState();

  const checkboxProps = {
    ...(!row
      ? parseFromValuesOrFunc(muiSelectAllCheckboxProps, { table })
      : parseFromValuesOrFunc(muiSelectCheckboxProps, { row, table })),
    ...rest,
  };

  const allRowsSelected = selectAll
    ? selectAllMode === 'page'
      ? table.getIsAllPageRowsSelected()
      : table.getIsAllRowsSelected()
    : undefined;

  const commonProps = {
    checked: selectAll ? allRowsSelected : row?.getIsSelected(),
    disabled:
      isLoading ||
      (row &&
        (!row.getCanSelect() ||
          row.index === -1 ||
          row.id === 'mrt-row-create')),
    inputProps: {
      'aria-label': selectAll
        ? localization.toggleSelectAll
        : localization.toggleSelectRow,
    },
    onChange: (event) => {
      event.stopPropagation();
      row
        ? row.getToggleSelectedHandler()(event)
        : selectAllMode === 'all'
          ? table.getToggleAllRowsSelectedHandler()(event)
          : table.getToggleAllPageRowsSelectedHandler()(event);
      if (enableRowPinning && rowPinningDisplayMode?.includes('select')) {
        if (row) {
          row.pin(
            !row.getIsPinned() && event.target.checked
              ? rowPinningDisplayMode?.includes('bottom')
                ? 'bottom'
                : 'top'
              : false,
          );
        } else {
          table.setRowPinning({ bottom: [], top: [] });
        }
      }
    },
    size: (density === 'compact' ? 'small' : 'medium') as 'medium' | 'small',
    ...checkboxProps,
    onClick: (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      checkboxProps?.onClick?.(e);
    },
    sx: (theme: Theme) => ({
      height: density === 'compact' ? '1.75rem' : '2.5rem',
      m: density !== 'compact' ? '-0.4rem' : undefined,
      width: density === 'compact' ? '1.75rem' : '2.5rem',
      zIndex: 0,
      ...parseFromValuesOrFunc(checkboxProps?.sx, theme),
    }),
    title: undefined,
  } as CheckboxProps | RadioProps;

  return (
    <Tooltip
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
