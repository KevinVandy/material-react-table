import React, { ChangeEvent, FC } from 'react';
import { Checkbox } from '@mui/material';
import { Row } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TableButtonCell } from '../table/MRT_TableButtonCell';

interface Props {
  row: Row;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row }) => {
  const { tableInstance, onRowSelectChange, densePadding, localization } =
    useMaterialReactTable();

  const onSelectChange = (event: ChangeEvent) => {
    row.getToggleRowSelectedProps()?.onChange?.(event);
    onRowSelectChange?.(event, row, tableInstance.selectedFlatRows);
  };

  return (
    <MRT_TableButtonCell densePadding={densePadding}>
      <Checkbox
        inputProps={{
          'aria-label': localization?.selectCheckboxTitle,
        }}
        onChange={onSelectChange}
        {...row.getToggleRowSelectedProps()}
      />
    </MRT_TableButtonCell>
  );
};
