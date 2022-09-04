import React, { FC, memo } from 'react';
import { MRT_Cell, MRT_TableInstance } from '..';

interface Props {
  cell: MRT_Cell;
  table: MRT_TableInstance;
}

const _MRT_TableBodyCellValue: FC<Props> = ({ cell, table }) => {
  const { column, row } = cell;
  const { columnDef } = column;

  return (
    <>
      {cell.getIsAggregated() && columnDef.AggregatedCell
        ? columnDef.AggregatedCell({
            cell,
            column,
            row,
            table,
          })
        : row.getIsGrouped() && !cell.getIsGrouped()
        ? null
        : cell.getIsGrouped() && columnDef.GroupedCell
        ? columnDef.GroupedCell({
            cell,
            column,
            row,
            table,
          })
        : columnDef?.Cell?.({ cell, column, row, table }) ?? cell.renderValue()}
    </>
  );
};

export const MRT_TableBodyCellValue = memo(
  _MRT_TableBodyCellValue,
  (prev, next) => prev.cell.getValue() === next.cell.getValue(),
);
