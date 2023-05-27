import { type ReactNode } from 'react';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';
import highlightWords from 'highlight-words';
import { type MRT_Cell, type MRT_TableInstance } from '../types';

const allowedTypes = ['string', 'number'];

interface Props {
  cell: MRT_Cell;
  table: MRT_TableInstance;
}

export const MRT_TableBodyCellValue = ({ cell, table }: Props) => {
  const {
    getState,
    options: { enableFilterMatchHighlighting },
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { globalFilter, globalFilterFn } = getState();
  const filterValue = column.getFilterValue();

  let renderedCellValue =
    cell.getIsAggregated() && columnDef.AggregatedCell
      ? columnDef.AggregatedCell({
          cell,
          column,
          row,
          table,
        })
      : row.getIsGrouped() && !cell.getIsGrouped()
      ? null
      : cell.getIsGrouped() && columnDef.GroupedCell
      ? columnDef.GroupedCell({
          cell,
          column,
          row,
          table,
        })
      : undefined;

  const isGroupedValue = renderedCellValue !== undefined;

  if (!isGroupedValue) {
    renderedCellValue = cell.renderValue() as number | string | ReactNode;
  }

  if (
    enableFilterMatchHighlighting &&
    columnDef.enableFilterMatchHighlighting !== false &&
    renderedCellValue &&
    allowedTypes.includes(typeof renderedCellValue) &&
    ((filterValue &&
      allowedTypes.includes(typeof filterValue) &&
      columnDef.filterVariant === 'text') ||
      (globalFilter &&
        allowedTypes.includes(typeof globalFilter) &&
        column.getCanGlobalFilter()))
  ) {
    const chunks = highlightWords?.({
      text: renderedCellValue?.toString() as string,
      query: (filterValue ?? globalFilter ?? '').toString(),
      matchExactly:
        (filterValue ? columnDef._filterFn : globalFilterFn) !== 'fuzzy',
    });
    if (chunks?.length > 1 || chunks?.[0]?.match) {
      renderedCellValue = (
        <span aria-label={renderedCellValue as string} role="note">
          {chunks?.map(({ key, match, text }) => (
            <Box
              aria-hidden="true"
              component="span"
              key={key}
              sx={
                match
                  ? {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? darken(theme.palette.warning.dark, 0.25)
                          : lighten(theme.palette.warning.light, 0.5),
                      borderRadius: '2px',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? 'white' : 'black',
                      padding: '2px 1px',
                    }
                  : undefined
              }
            >
              {text}
            </Box>
          )) ?? renderedCellValue}
        </span>
      );
    }
  }

  if (columnDef.Cell && !isGroupedValue) {
    renderedCellValue = columnDef.Cell({
      cell,
      renderedCellValue,
      column,
      row,
      table,
    });
  }

  return <>{renderedCellValue}</>;
};
