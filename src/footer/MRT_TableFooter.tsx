import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TablePagination } from '../toolbar/MRT_TablePagination';

interface Props {}

export const MRT_TableFooter: FC<Props> = () => {
  const { tableInstance, tableFooterProps, options } = useMaterialReactTable();

  const hasFooterGroups = tableInstance.columns.some(
    (c) => c.depth === 0 && !!c.Footer,
  );

  return (
    <TableFooter {...tableFooterProps}>
      {hasFooterGroups &&
        tableInstance.footerGroups.map((footerGroup, index) => (
          <MRT_TableFooterRow
            key={`${index}-${footerGroup.id}`}
            footerGroup={footerGroup}
          />
        ))}
      {options.enablePagination === true ||
        (['bottom', 'both'].includes(options.enablePagination.toString()) && (
          <MRT_TablePagination />
        ))}
    </TableFooter>
  );
};
