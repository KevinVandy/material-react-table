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
  const { currentFilterFns, showFilters } = getState();
  const { column } = header;

  return (
    <Collapse in={showFilters} mountOnEnter unmountOnExit>
      {currentFilterFns[column.id] === 'between' ? (
        <MRT_FilterRangeFields header={header} table={table} />
      ) : (
        <MRT_FilterTextField header={header} table={table} />
      )}
    </Collapse>
  );
};
