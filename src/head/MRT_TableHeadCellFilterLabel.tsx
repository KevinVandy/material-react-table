import React, { FC, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  instance: MRT_TableInstance;
}

export const MRT_TableHeadCellFilterLabel: FC<Props> = ({
  header,
  instance,
}) => {
  const {
    getState,
    options: {
      icons: { FilterAltIcon, FilterAltOffIcon },
      localization,
    },
    setShowFilters,
  } = instance;

  const { showFilters } = getState();

  const { column } = header;

  const { columnDef } = column;

  const filterFn = getState()?.currentFilterFns?.[header.id];

  const filterTooltip = !!column.getFilterValue()
    ? localization.filteringByColumn
        .replace('{column}', String(columnDef.header))
        .replace(
          '{filterType}',
          filterFn instanceof Function
            ? ''
            : // @ts-ignore
              localization[
                `filter${filterFn.charAt(0).toUpperCase() + filterFn.slice(1)}`
              ],
        )
        .replace(
          '{filterValue}',
          `"${
            Array.isArray(column.getFilterValue())
              ? (column.getFilterValue() as [string, string]).join(
                  `" ${localization.and} "`,
                )
              : (column.getFilterValue() as string)
          }"`,
        )
        .replace('" "', '')
    : localization.showHideFilters;

  return (
    <Tooltip arrow placement="top" title={filterTooltip}>
      <IconButton
        disableRipple
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          setShowFilters(!showFilters);
        }}
        size="small"
        sx={{
          m: 0,
          opacity: !!column.getFilterValue() || showFilters ? 0.8 : 0,
          p: '2px',
          transition: 'all 0.2s ease-in-out',
          transform: 'scale(0.66)',
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: 0.8,
          },
          width: '1.5ch',
        }}
      >
        {showFilters && !column.getFilterValue() ? (
          <FilterAltOffIcon />
        ) : (
          <FilterAltIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};
