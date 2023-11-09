import Badge from '@mui/material/Badge';
import TableSortLabel, {
  type TableSortLabelProps,
} from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TableSortLabelProps {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellSortLabel = <TData extends MRT_RowData>({
  header,
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { ArrowDownwardIcon, SyncAltIcon },
      localization,
    },
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { isLoading, showSkeletons, sorting } = getState();

  const isSorted = !!column.getIsSorted();

  const sortTooltip =
    isLoading || showSkeletons
      ? ''
      : column.getIsSorted()
      ? column.getIsSorted() === 'desc'
        ? localization.sortedByColumnDesc.replace('{column}', columnDef.header)
        : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
      : column.getNextSortingOrder() === 'desc'
      ? localization.sortByColumnDesc.replace('{column}', columnDef.header)
      : localization.sortByColumnAsc.replace('{column}', columnDef.header);

  return (
    <Tooltip placement="top" title={sortTooltip}>
      <Badge
        badgeContent={sorting.length > 1 ? column.getSortIndex() + 1 : 0}
        overlap="circular"
      >
        <TableSortLabel
          IconComponent={
            !isSorted
              ? (props) => (
                  <SyncAltIcon
                    {...props}
                    direction={isSorted ? (column.getIsSorted() as 'asc' | 'desc') : undefined}
                    style={{
                      transform: 'rotate(-90deg) scaleX(0.9) translateX(-1px)',
                    }}
                  />
                )
              : ArrowDownwardIcon
          }
          active
          aria-label={sortTooltip}
          direction={
            isSorted ? (column.getIsSorted() as 'asc' | 'desc') : undefined
          }
          onClick={(e) => {
            e.stopPropagation();
            header.column.getToggleSortingHandler()?.(e);
          }}
          {...rest}
          sx={(theme) => ({
            '.MuiTableSortLabel-icon': {
              color: `${
                theme.palette.mode === 'dark'
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary
              } !important`,
            },
            flex: '0 0',
            opacity: isSorted ? 1 : 0.3,
            transition: 'all 150ms ease-in-out',
            width: '3ch',
            ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
          })}
        />
      </Badge>
    </Tooltip>
  );
};
