import React, { Dispatch, FC, SetStateAction } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  currentHoveredColumn: MRT_Column | null;
  setCurrentHoveredColumn: Dispatch<SetStateAction<MRT_Column | null>>;
  table: MRT_TableInstance;
}

export const MRT_TableHead: FC<Props> = ({
  currentHoveredColumn,
  setCurrentHoveredColumn,
  table,
}) => {
  const {
    getHeaderGroups,
    options: { muiTableHeadProps },
  } = table;

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps({ table })
      : muiTableHeadProps;

  return (
    <TableHead {...tableHeadProps}>
      {getHeaderGroups().map((headerGroup) => (
        <MRT_TableHeadRow
          currentHoveredColumn={currentHoveredColumn}
          setCurrentHoveredColumn={setCurrentHoveredColumn}
          headerGroup={headerGroup as any}
          key={headerGroup.id}
          table={table}
        />
      ))}
    </TableHead>
  );
};
