import React, { FC } from 'react';
import { Collapse } from '@mui/material';
import { MRT_FilterRangeFields } from '../inputs/MRT_FilterRangeFields';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import { MRT_FILTER_OPTION } from '../enums';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHeadCellFilterContainer: FC<Props> = ({
  header,
  tableInstance,
}) => {
  const { getState } = tableInstance;

  const { currentFilterFns, showFilters } = getState();

  const { column } = header;

  return (
    <Collapse in={showFilters} mountOnEnter unmountOnExit>
      {currentFilterFns[column.id] === MRT_FILTER_OPTION.BETWEEN ? (
        <MRT_FilterRangeFields header={header} tableInstance={tableInstance} />
      ) : (
        <MRT_FilterTextField header={header} tableInstance={tableInstance} />
      )}
    </Collapse>
  );
};
