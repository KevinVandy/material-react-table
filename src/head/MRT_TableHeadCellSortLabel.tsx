import React, { FC } from 'react';
import { TableSortLabel, Tooltip } from '@mui/material';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellSortLabel: FC<Props> = ({ header, table }) => {
  const {
    options: { localization },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const sortTooltip = !!column.getIsSorted()
    ? column.getIsSorted() === 'desc'
      ? localization.sortedByColumnDesc.replace('{column}', columnDef.header)
      : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
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
        sx={{
          width: '2ch',
          transform: 'translateX(-0.5ch)',
        }}
      />
    </Tooltip>
  );
};
