import React, { FC } from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { MRT_Header, MRT_TableInstance } from '..';
import type { TableCellProps } from '@mui/material/TableCell';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
  tableCellProps?: TableCellProps;
}

export const MRT_TableHeadCellSortLabel: FC<Props> = ({
  header,
  table,
  tableCellProps,
}) => {
  const {
    options: {
      icons: { ArrowDownwardIcon },
      localization,
    },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const sortTooltip = column.getIsSorted()
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
          flex: '0 0',
          width: '2.3ch',
          transform:
            tableCellProps?.align !== 'right'
              ? 'translateX(-0.5ch)'
              : undefined,
        }}
        IconComponent={ArrowDownwardIcon}
      />
    </Tooltip>
  );
};
