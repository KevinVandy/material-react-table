import { type MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterLabel = <
  TData extends Record<string, any> = {},
>({
  header,
  table,
}: Props<TData>) => {
  const {
    options: {
      columnFilterDisplayMode,
      icons: { FilterAltIcon },
      localization,
    },
    refs: { filterInputRefs },
    setShowColumnFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const filterValue = column.getFilterValue();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isFilterActive =
    (Array.isArray(filterValue) && filterValue.some(Boolean)) ||
    (!!filterValue && !Array.isArray(filterValue));

  const isRangeFilter =
    columnDef.filterVariant === 'range' ||
    ['between', 'betweenInclusive', 'inNumberRange'].includes(
      columnDef._filterFn,
    );
  const currentFilterOption = columnDef._filterFn;
  const filterTooltip =
    columnFilterDisplayMode === 'popover' && !isFilterActive
      ? localization.filterByColumn?.replace(
          '{column}',
          String(columnDef.header),
        )
      : localization.filteringByColumn
          .replace('{column}', String(columnDef.header))
          .replace(
            '{filterType}',
            currentFilterOption
              ? // @ts-ignore
                localization[
                  `filter${
                    currentFilterOption?.charAt(0)?.toUpperCase() +
                    currentFilterOption?.slice(1)
                  }`
                ]
              : '',
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
    <>
      <Grow
        in={
          columnFilterDisplayMode === 'popover' ||
          (!!column.getFilterValue() && !isRangeFilter) ||
          (isRangeFilter && // @ts-ignore
            (!!column.getFilterValue()?.[0] || !!column.getFilterValue()?.[1]))
        }
        unmountOnExit
      >
        <Box component="span" sx={{ flex: '0 0' }}>
          <Tooltip arrow placement="top" title={filterTooltip}>
            <IconButton
              disableRipple
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                if (columnFilterDisplayMode === 'popover') {
                  setAnchorEl(event.currentTarget);
                } else {
                  setShowColumnFilters(true);
                }
                queueMicrotask(() => {
                  filterInputRefs.current[`${column.id}-0`]?.focus();
                  filterInputRefs.current[`${column.id}-0`]?.select();
                });
                event.stopPropagation();
              }}
              sx={{
                height: '16px',
                opacity: 0.8,
                p: '8px',
                transform: 'scale(0.75)',
                width: '16px',
              }}
            >
              <FilterAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Grow>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        onClose={(event) => {
          //@ts-ignore
          event.stopPropagation();
          setAnchorEl(null);
        }}
        open={!!anchorEl}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      >
        <Box sx={{ p: '1rem' }}>
          <MRT_TableHeadCellFilterContainer header={header} table={table} />
        </Box>
      </Popover>
    </>
  );
};
