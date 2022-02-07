import React, { ChangeEvent, FC } from 'react';
import { Checkbox, TableCell as MuiTableCell, styled } from '@mui/material';
import { Row } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'densePadding',
})<{ densePadding?: boolean }>(({ densePadding }) => ({
  padding: densePadding ? '0' : '0.6rem',
  transition: 'all 0.2s ease-in-out',
}));

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
    <TableCell densePadding={densePadding}>
      <Checkbox
        inputProps={{
          'aria-label': localization?.selectCheckboxTitle,
        }}
        onChange={onSelectChange}
        {...row.getToggleRowSelectedProps()}
      />
    </TableCell>
  );
};
