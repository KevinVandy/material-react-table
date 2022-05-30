import React, { FC } from 'react';
import { TableSortLabel, Tooltip } from '@mui/material';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHeadCellSortLabel: FC<Props> = ({
  header,
  tableInstance,
}) => {
  const {
    options: { localization },
  } = tableInstance;

  const { column } = header;

  const sortTooltip = !!column.getIsSorted()
    ? column.getIsSorted() === 'desc'
      ? localization.sortedByColumnDesc.replace(
          '{column}',
          column.columnDef.header,
        )
      : localization.sortedByColumnAsc.replace(
          '{column}',
          column.columnDef.header,
        )
    : localization.unsorted;

  return (
    <Tooltip arrow placement="top" title={sortTooltip}>
      <TableSortLabel
        aria-label={sortTooltip}
        active={!!column.getIsSorted()}
        direction={
          column.getIsSorted()
            ? (column.getIsSorted() as 'asc' | 'desc')
            : undefined
        }
      />
    </Tooltip>
  );
};
