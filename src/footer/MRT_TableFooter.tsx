import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {}

export const MRT_TableFooter: FC<Props> = () => {
  const { muiTableFooterProps, tableInstance } = useMaterialReactTable();

  return (
    <TableFooter {...muiTableFooterProps}>
      {tableInstance.footerGroups.map((footerGroup, index) => (
        <MRT_TableFooterRow
          key={`${index}-${footerGroup.id}`}
          footerGroup={footerGroup}
        />
      ))}
    </TableFooter>
  );
};
