import Badge from '@mui/material/Badge';
import { type TableCellProps } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
  tableCellProps?: TableCellProps;
}

export const MRT_TableHeadCellSortLabel = <TData extends Record<string, any>>({
  header,
  table,
  tableCellProps,
}: Props<TData>) => {
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
    : column.getNextSortingOrder() === 'desc'
    ? localization.sortByColumnDesc.replace('{column}', columnDef.header)
    : localization.sortByColumnAsc.replace('{column}', columnDef.header);

  return (
    <Tooltip arrow placement="top" title={sortTooltip}>
      <Badge
        badgeContent={sorting.length > 1 ? column.getSortIndex() + 1 : 0}
        overlap="circular"
      >
        <TableSortLabel
          IconComponent={ArrowDownwardIcon}
          active={!!column.getIsSorted()}
          aria-label={sortTooltip}
          direction={
            column.getIsSorted()
              ? (column.getIsSorted() as 'asc' | 'desc')
              : undefined
          }
          onClick={(e) => {
            e.stopPropagation();
            header.column.getToggleSortingHandler()?.(e);
          }}
          sx={{
            flex: '0 0',
            transform:
              tableCellProps?.align !== 'right'
                ? 'translateX(-0.5ch)'
                : undefined,
            width: '2.4ch',
          }}
        />
      </Badge>
    </Tooltip>
  );
};
