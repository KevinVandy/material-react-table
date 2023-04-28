import React from 'react';
import Collapse from '@mui/material/Collapse';
import { TRT_FilterRangeFields } from '../inputs/TRT_FilterRangeFields';
import { TRT_FilterTextField } from '../inputs/TRT_FilterTextField';
import { TRT_Header, TRT_TableInstance } from '..';
import { TRT_FilterCheckbox } from '../inputs/TRT_FilterCheckbox';

interface Props {
  header: TRT_Header;
  table: TRT_TableInstance;
}

export const TRT_TableHeadCellFilterContainer = ({ header, table }: Props) => {
  const { getState } = table;
  const { showColumnFilters } = getState();
  const { column } = header;
  const { columnDef } = column;

  return (
    <Collapse in={showColumnFilters} mountOnEnter unmountOnExit>
      {columnDef.filterVariant === 'checkbox' ? (
        <TRT_FilterCheckbox column={column} table={table} />
      ) : columnDef.filterVariant === 'range' ||
        ['between', 'betweenInclusive', 'inNumberRange'].includes(
          columnDef._filterFn,
        ) ? (
        <TRT_FilterRangeFields header={header} table={table} />
      ) : (
        <TRT_FilterTextField header={header} table={table} />
      )}
    </Collapse>
  );
};
