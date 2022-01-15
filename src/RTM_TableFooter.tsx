import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { RTM_TableFooterRow } from './RTM_TableFooterRow';
import { useReactTableMui } from './useReactTableMui';
import { RTM_TableFooterPagination } from './RTM_TableFooterPagination';

interface Props {}

export const RTM_TableFooter: FC<Props> = () => {
  const { tableInstance, tableFooterProps } = useReactTableMui();

  const hasFooterGroups = tableInstance.columns.some((c) => !!c.Footer);

  return (
    <TableFooter {...tableFooterProps}>
      {hasFooterGroups &&
        tableInstance.footerGroups.map((footerGroup, index) => (
          <RTM_TableFooterRow
            key={`${index}-${footerGroup.id}`}
            footerGroup={footerGroup}
          />
        ))}
      <RTM_TableFooterPagination />
    </TableFooter>
  );
};
