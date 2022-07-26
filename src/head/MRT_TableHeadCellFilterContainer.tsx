import React, { FC } from 'react';
import { Collapse } from '@mui/material';
import { MRT_FilterRangeFields } from '../inputs/MRT_FilterRangeFields';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellFilterContainer: FC<Props> = ({
  header,
  table,
}) => {
  const { getState } = table;
  const { currentFilterFns, showColumnFilters } = getState();
  const { column } = header;

  return (
    <Collapse in={showColumnFilters} mountOnEnter unmountOnExit>
      {['between', 'betweenInclusive', 'inNumberRange'].includes(
        currentFilterFns[column.id],
      ) ? (
        <MRT_FilterRangeFields header={header} table={table} />
      ) : (
        <MRT_FilterTextField header={header} table={table} />
      )}
    </Collapse>
  );
};
