import { type MouseEvent } from 'react';
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import Radio, { type RadioProps } from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import { type Theme } from '@mui/material/styles';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import {
  getIsRowSelected,
  getMRT_RowSelectionHandler,
  getMRT_SelectAllHandler,
} from '../../utils/row.utils';
import { getCommonTooltipProps } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_SelectCheckboxProps<TData extends MRT_RowData>
  extends CheckboxProps {
  row?: MRT_Row<TData>;
  staticRowIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_SelectCheckbox = <TData extends MRT_RowData>({
  row,
  staticRowIndex,
  table,
  ...rest
}: MRT_SelectCheckboxProps<TData>) => {
  const {
    getState,
    options: {
      enableMultiRowSelection,
      localization,
      muiSelectAllCheckboxProps,
      muiSelectCheckboxProps,
      selectAllMode,
      manualPagination,
      rowCount,
    },
  } = table;
  const { density, isLoading, rowSelection } = getState();

  const selectAll = !row;

  const allRowsSelected = selectAll
    ? selectAllMode === 'page'
      ? table.getIsAllPageRowsSelected()
      : table.getIsAllRowsSelected()
    : undefined;

  const isVisuallyChecked =
    selectAll && manualPagination && rowCount !== undefined
      ? Object.keys(rowSelection).length === rowCount
      : allRowsSelected;

  const isSomeRowsSelected = selectAll
    ? manualPagination && rowCount !== undefined
      ? Object.keys(rowSelection).length > 0 &&
        Object.keys(rowSelection).length < rowCount
      : selectAllMode === 'page' && table.getIsAllPageRowsSelected()
        ? false
        : table.getIsSomeRowsSelected()
    : undefined;

  const shouldDeselect =
    selectAll && manualPagination && rowCount !== undefined
      ? selectAllMode === 'page'
        ? table.getIsAllPageRowsSelected()
        : Object.keys(rowSelection).length === rowCount
      : allRowsSelected;

  const isChecked = selectAll
    ? isVisuallyChecked
    : getIsRowSelected({ row, table });

  const checkboxProps = {
    ...(selectAll
      ? parseFromValuesOrFunc(muiSelectAllCheckboxProps, { table })
      : parseFromValuesOrFunc(muiSelectCheckboxProps, {
          row,
          staticRowIndex,
          table,
        })),
    ...rest,
  };

  const onSelectionChange = row
    ? getMRT_RowSelectionHandler({
        row,
        staticRowIndex,
        table,
      })
    : undefined;

  const onSelectAllChange = getMRT_SelectAllHandler({ table });

  const handleSelectAllChange = (event: any) => {
    event.stopPropagation();
    if (selectAll && manualPagination && rowCount !== undefined) {
      const syntheticEvent = {
        ...event,
        target: { ...event.target, checked: !shouldDeselect },
      };
      onSelectAllChange(syntheticEvent);
    } else {
      onSelectAllChange(event);
    }
  };

  const commonProps = {
    'aria-label': selectAll
      ? localization.toggleSelectAll
      : localization.toggleSelectRow,
    checked: isChecked,
    disabled:
      isLoading || (row && !row.getCanSelect()) || row?.id === 'mrt-row-create',
    inputProps: {
      'aria-label': selectAll
        ? localization.toggleSelectAll
        : localization.toggleSelectRow,
    },
    onChange: (event) => {
      event.stopPropagation();
      selectAll ? handleSelectAllChange(event) : onSelectionChange!(event);
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
      {...getCommonTooltipProps()}
      title={
        checkboxProps?.title ??
        (selectAll
          ? localization.toggleSelectAll
          : localization.toggleSelectRow)
      }
    >
      {enableMultiRowSelection === false ? (
        <Radio {...(commonProps as any)} />
      ) : (
        <Checkbox
          indeterminate={
            !isChecked && selectAll
              ? isSomeRowsSelected
              : row?.getIsSomeSelected() && row.getCanSelectSubRows()
          }
          {...commonProps}
        />
      )}
    </Tooltip>
  );
};
