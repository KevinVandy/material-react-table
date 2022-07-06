import React, { Dispatch, FC, SetStateAction } from 'react';
import { alpha, lighten, TableRow } from '@mui/material';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import type {
  MRT_Column,
  MRT_Header,
  MRT_HeaderGroup,
  MRT_TableInstance,
} from '..';

interface Props {
  currentHoveredColumn: MRT_Column | null;
  setCurrentHoveredColumn: Dispatch<SetStateAction<MRT_Column | null>>;
  headerGroup: MRT_HeaderGroup;
  table: MRT_TableInstance;
}

export const MRT_TableHeadRow: FC<Props> = ({
  currentHoveredColumn,
  setCurrentHoveredColumn,
  headerGroup,
  table,
}) => {
  const {
    options: { muiTableHeadRowProps },
  } = table;

  const tableRowProps =
    muiTableHeadRowProps instanceof Function
      ? muiTableHeadRowProps({ headerGroup, table })
      : muiTableHeadRowProps;

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        boxShadow: `4px 0 8px ${alpha(theme.palette.common.black, 0.1)}`,
        backgroundColor: lighten(theme.palette.background.default, 0.04),
        ...(tableRowProps?.sx as any),
      })}
    >
      {headerGroup.headers.map((header: MRT_Header, index) => (
        <MRT_TableHeadCell
          currentHoveredColumn={currentHoveredColumn}
          setCurrentHoveredColumn={setCurrentHoveredColumn}
          header={header}
          key={header.id || index}
          table={table}
        />
      ))}
    </TableRow>
  );
};
