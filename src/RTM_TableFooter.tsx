import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { RTM_TableFooterRow } from './RTM_TableFooterRow';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const RTM_TableFooter: FC<Props> = () => {
  const { tableInstance } = useReactTableMui();

  const hasFooterGroups = tableInstance.columns.some((c) => !!c.Footer);

  return (
    <TableFooter>
      {hasFooterGroups &&
        tableInstance.footerGroups.map((footerGroup, index) => (
          <RTM_TableFooterRow
            key={`${index}-${footerGroup.id}`}
            footerGroup={footerGroup}
          />
        ))}
    </TableFooter>
  );
};
