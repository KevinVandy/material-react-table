import React, { FC, MouseEvent } from 'react';
import { Grow, IconButton, Tooltip } from '@mui/material';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellFilterLabel: FC<Props> = ({ header, table }) => {
  const {
    getState,
    options: {
      icons: { FilterAltIcon },
      localization,
    },
  } = table;
  const { currentFilterFns } = getState();
  const { column } = header;
  const { columnDef } = column;

  const currentFilterOption = currentFilterFns?.[header.id];
  const filterTooltip = localization.filteringByColumn
    .replace('{column}', String(columnDef.header))
    .replace(
      '{filterType}',
      // @ts-ignore
      localization[
        `filter${
          currentFilterOption.charAt(0).toUpperCase() +
          currentFilterOption.slice(1)
        }`
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
    .replace('" "', '');

  return (
    <Grow
      unmountOnExit
      in={
        (!!column.getFilterValue() && currentFilterOption !== 'between') ||
        (currentFilterOption === 'between' && // @ts-ignore
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
