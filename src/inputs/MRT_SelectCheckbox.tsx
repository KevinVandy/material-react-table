import React, { ChangeEvent, FC } from 'react';
import { Checkbox, TableCell, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';
import { commonTableBodyButtonCellStyles } from '../body/MRT_TableBodyCell';

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
      onSelectAllChange?.(event, tableInstance.selectedFlatRows);
    } else if (row) {
      row?.getToggleRowSelectedProps()?.onChange?.(event);
      onRowSelectChange?.(event, row, tableInstance.selectedFlatRows);
    }
  };

  const checkboxProps = selectAll
    ? tableInstance.getToggleAllRowsSelectedProps()
    : row?.getToggleRowSelectedProps();

  return (
    <TableCell
      sx={{
        ...commonTableBodyButtonCellStyles(tableInstance.state.densePadding),
        maxWidth: '2rem',
        width: '2rem',
      }}
    >
      <Tooltip
        arrow
        enterDelay={1000}
        enterNextDelay={1000}
        title={
          selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow
        }
      >
        <Checkbox
          inputProps={{
            'aria-label': selectAll
              ? localization.toggleSelectAll
              : localization.toggleSelectRow,
          }}
          onChange={onSelectChange}
          {...checkboxProps}
          title={undefined}
        />
      </Tooltip>
    </TableCell>
  );
};
