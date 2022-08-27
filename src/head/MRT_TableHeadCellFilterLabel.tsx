import React, { FC, MouseEvent } from 'react';
import { Grow, IconButton, Tooltip } from '@mui/material';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellFilterLabel: FC<Props> = ({ header, table }) => {
  const {
    options: {
      icons: { FilterAltIcon },
      localization,
    },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const isRangeFilter = [
    'between',
    'betweenInclusive',
    'inNumberRange',
  ].includes(columnDef._filterFn);
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
        (!!column.getFilterValue() && isRangeFilter) ||
        (!isRangeFilter && // @ts-ignore
          (!!column.getFilterValue()?.[0] || !!column.getFilterValue()?.[1]))
      }
    >
      <span>
        <Tooltip arrow placement="top" title={filterTooltip}>
          <IconButton
            disableRipple
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
            }}
            size="small"
            sx={{
              m: 0,
              opacity: 0.8,
              p: '2px',
              transform: 'scale(0.66)',
              width: '1.5ch',
            }}
          >
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
      </span>
    </Grow>
  );
};
