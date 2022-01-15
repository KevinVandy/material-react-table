import React, { createContext, FC, useContext } from 'react';
import { TableInstance, usePagination, useTable } from 'react-table';
import { ReactTableMuiOptionsProps, ReactTableMuiProps } from '.';

interface IUseReactTableMui extends ReactTableMuiOptionsProps {
  tableInstance: TableInstance<object>;
}

const ReactTableMuiContext = createContext<IUseReactTableMui>(
  {} as IUseReactTableMui,
);

interface ProviderProps extends ReactTableMuiProps {
  children: React.ReactNode;
}

export const ReactTableMuiProvider: FC<ProviderProps> = ({
  children,
  columns,
  data,
  ...rest
}) => {
  const tableInstance = useTable({ columns, data }, usePagination);

  return (
    <ReactTableMuiContext.Provider value={{ tableInstance, ...rest }}>
      {children}
    </ReactTableMuiContext.Provider>
  );
};

export const useReactTableMui = (): IUseReactTableMui =>
  useContext(ReactTableMuiContext);
