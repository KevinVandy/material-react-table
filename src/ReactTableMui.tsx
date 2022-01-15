import React, { FC } from 'react';
import { Column, useTable } from 'react-table';
import { MuiTable } from './MuiTable';

export interface Props {
  columns: Column[];
  data: any[];
}

export const ReactTableMui: FC<Props> = ({ columns, data }) => {
  const reactTable = useTable({ columns, data });
  return <MuiTable reactTable={reactTable} />;
};
