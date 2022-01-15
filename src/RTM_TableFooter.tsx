import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { RTM_TableFooterRow } from './RTM_TableFooterRow';
import { useReactTableMui } from './useReactTableMui';
import { RTM_TablePagination } from './RTM_TablePagination';

interface Props {}

export const RTM_TableFooter: FC<Props> = () => {
  const { tableInstance, tableFooterProps, options } = useReactTableMui();

  const hasFooterGroups = tableInstance.columns.some(
    (c) => c.depth === 0 && !!c.Footer,
  );

  return (
    <TableFooter {...tableFooterProps}>
      {hasFooterGroups &&
        tableInstance.footerGroups.map((footerGroup, index) => (
          <RTM_TableFooterRow
            key={`${index}-${footerGroup.id}`}
            footerGroup={footerGroup}
          />
        ))}
      {options.showPagination === true ||
        (['bottom', 'both'].includes(options.showPagination.toString()) && (
          <RTM_TablePagination />
        ))}
    </TableFooter>
  );
};
