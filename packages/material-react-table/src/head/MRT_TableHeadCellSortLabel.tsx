import Badge from '@mui/material/Badge';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import { type TableCellProps } from '@mui/material/TableCell';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
  tableCellProps?: TableCellProps;
}

export const MRT_TableHeadCellSortLabel = ({
  header,
  table,
  tableCellProps,
}: Props) => {
  const {
    getState,
    options: {
      icons: { ArrowDownwardIcon },
      localization,
    },
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { sorting } = getState();

  const sortTooltip = column.getIsSorted()
    ? column.getIsSorted() === 'desc'
      ? localization.sortedByColumnDesc.replace('{column}', columnDef.header)
      : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
    : localization.unsorted;

  return (
    <Tooltip arrow placement="top" title={sortTooltip}>
      <Badge
        badgeContent={sorting.length > 1 ? column.getSortIndex() + 1 : 0}
        overlap="circular"
      >
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
            width: '2.4ch',
            transform:
              tableCellProps?.align !== 'right'
                ? 'translateX(-0.5ch)'
                : undefined,
          }}
          IconComponent={ArrowDownwardIcon}
          onClick={(e) => {
            e.stopPropagation();
            header.column.getToggleSortingHandler()?.(e);
          }}
        />
      </Badge>
    </Tooltip>
  );
};
