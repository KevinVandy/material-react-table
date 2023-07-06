import { type MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterLabel = <
  TData extends Record<string, any>,
>({
  header,
  table,
}: Props<TData>) => {
  const {
    options: {
      icons: { FilterAltIcon },
      localization,
    },
    refs: { filterInputRefs },
    setShowColumnFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const isRangeFilter =
    ['range', 'ranger-slider'].includes(columnDef.filterVariant ?? '') ||
    ['between', 'betweenInclusive', 'inNumberRange'].includes(
      columnDef._filterFn,
    );
  const currentFilterOption = columnDef._filterFn;
  const filterTooltip = localization.filteringByColumn
    .replace('{column}', String(columnDef.header))
    .replace(
      '{filterType}',
      // @ts-ignore
      localization[
        `filter${
          currentFilterOption?.charAt(0)?.toUpperCase() +
          currentFilterOption?.slice(1)
        }`
      ],
    )
    .replace(
      '{filterValue}',
      `"${
        Array.isArray(column.getFilterValue())
          ? (column.getFilterValue() as [string, string]).join(
              `" ${isRangeFilter ? localization.and : localization.or} "`,
            )
          : (column.getFilterValue() as string)
      }"`,
    )
    .replace('" "', '');

  return (
    <Grow
      unmountOnExit
      in={
        (!!column.getFilterValue() && !isRangeFilter) ||
        (isRangeFilter && // @ts-ignore
          (!!column.getFilterValue()?.[0] || !!column.getFilterValue()?.[1]))
      }
    >
      <Box component="span" sx={{ flex: '0 0' }}>
        <Tooltip arrow placement="top" title={filterTooltip}>
          <IconButton
            disableRipple
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              setShowColumnFilters(true);
              queueMicrotask(() => {
                filterInputRefs.current[`${column.id}-0`]?.focus();
                filterInputRefs.current[`${column.id}-0`]?.select();
              });
              event.stopPropagation();
            }}
            size="small"
            sx={{
              height: '12px',
              m: 0,
              opacity: 0.8,
              p: '2px',
              transform: 'scale(0.66)',
              width: '12px',
            }}
          >
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Grow>
  );
};
