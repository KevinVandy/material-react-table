import React, { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  column: MRT_Column;
  table: MRT_TableInstance;
}

export const MRT_FilterCheckbox: FC<Props> = ({ column, table }) => {
  const {
    getState,
    options: { localization, muiTableHeadCellFilterCheckboxProps },
  } = table;
  const { density } = getState();
  const { columnDef } = column;

  const mTableHeadCellFilterCheckboxProps =
    muiTableHeadCellFilterCheckboxProps instanceof Function
      ? muiTableHeadCellFilterCheckboxProps({
          column,
          table,
        })
      : muiTableHeadCellFilterCheckboxProps;

  const mcTableHeadCellFilterCheckboxProps =
    columnDef.muiTableHeadCellFilterCheckboxProps instanceof Function
      ? columnDef.muiTableHeadCellFilterCheckboxProps({
          column,
          table,
        })
      : columnDef.muiTableHeadCellFilterCheckboxProps;

  const checkboxProps = {
    ...mTableHeadCellFilterCheckboxProps,
    ...mcTableHeadCellFilterCheckboxProps,
  } as CheckboxProps;

  const filterLabel = localization.filterByColumn?.replace(
    '{column}',
    columnDef.header,
  );

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={checkboxProps?.title ?? filterLabel}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={column.getFilterValue() === 'true'}
            indeterminate={column.getFilterValue() === undefined}
            color={
              column.getFilterValue() === undefined ? 'default' : 'primary'
            }
            size={density === 'compact' ? 'small' : 'medium'}
            {...checkboxProps}
            onClick={(e) => {
              e.stopPropagation();
              checkboxProps?.onClick?.(e);
            }}
            onChange={(e, checked) => {
              column.setFilterValue(
                column.getFilterValue() === undefined
                  ? 'true'
                  : column.getFilterValue() === 'true'
                  ? 'false'
                  : undefined,
              );
              checkboxProps?.onChange?.(e, checked);
            }}
            sx={(theme) => ({
              height: '2.5rem',
              width: '2.5rem',
              ...(checkboxProps?.sx instanceof Function
                ? checkboxProps.sx(theme)
                : (checkboxProps?.sx as any)),
            })}
          />
        }
        disableTypography
        label={checkboxProps.title ?? filterLabel}
        sx={{ color: 'text.secondary', mt: '-4px', fontWeight: 'normal' }}
        title={undefined}
      />
    </Tooltip>
  );
};
