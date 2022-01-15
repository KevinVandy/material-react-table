import React, { FC } from 'react';
import { useTable } from 'react-table';
import { MuiTable } from './MuiTable';

export interface Props {
  columns: any[];
  data: any[];
}

export const ReactTableMui: FC<Props> = ({ columns, data }) => {
  const reactTable = useTable({ columns, data });
  return <MuiTable reactTable={reactTable} />;
};
