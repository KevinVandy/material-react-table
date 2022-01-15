import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MuiTableFooterRow } from './MuiTableFooterRow';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const MuiTableFooter: FC<Props> = () => {
  const { reactTable } = useReactTableMui();

  const hasFooterGroups = reactTable.columns.some((c) => !!c.Footer);

  return (
    <TableFooter>
      {hasFooterGroups &&
        reactTable.footerGroups.map((footerGroup, index) => (
          <MuiTableFooterRow
            key={`${index}-${footerGroup.id}`}
            footerGroup={footerGroup}
          />
        ))}
    </TableFooter>
  );
};
