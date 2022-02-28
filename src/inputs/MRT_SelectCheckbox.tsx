import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_TableButtonCell } from '../table/MRT_TableButtonCell';
import { MRT_Row } from '..';

interface Props {
  row?: MRT_Row;
  selectAll?: boolean;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row, selectAll }) => {
  const {
    densePadding,
    localization,
    onRowSelectChange,
    onSelectAllChange,
    tableInstance,
  } = useMRT();

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
    <MRT_TableButtonCell densePadding={densePadding}>
      <Tooltip
        arrow
        enterDelay={1000}
        enterNextDelay={1000}
        title={
          selectAll
            ? localization.selectAllCheckboxTitle
            : localization.selectCheckboxTitle
        }
      >
        <Checkbox
          inputProps={{
            'aria-label': selectAll
              ? localization.selectAllCheckboxTitle
              : localization.selectCheckboxTitle,
          }}
          onChange={onSelectChange}
          {...checkboxProps}
          title={undefined}
        />
      </Tooltip>
    </MRT_TableButtonCell>
  );
};
