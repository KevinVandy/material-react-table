import React, { createContext, FC, useContext } from 'react';
import { TableInstance, useTable } from 'react-table';
import { ReactMuiTableProps } from '.';

interface IUseReactTableMui {
  reactTable: TableInstance<object>;
}

const ReactMuiTableContext = createContext<IUseReactTableMui>(
  {} as IUseReactTableMui,
);

interface Props extends ReactMuiTableProps {
  children: React.ReactNode;
}

export const ReactTableMuiProvider: FC<Props> = ({
  children,
  columns,
  data,
}) => {
  const reactTable = useTable({ columns, data });
  return (
    <ReactMuiTableContext.Provider value={{ reactTable }}>
      {children}
    </ReactMuiTableContext.Provider>
  );
};

export const useReactTableMui = (): IUseReactTableMui =>
  useContext(ReactMuiTableContext);
