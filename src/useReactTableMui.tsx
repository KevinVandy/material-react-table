import React, { createContext, FC, useContext } from 'react';
import { TableInstance, usePagination, useSortBy, useTable } from 'react-table';
import {
  ReactTableMuiOptionalProps,
  ReactTableMuiOptions,
  ReactTableMuiProps,
} from '.';
import { defaultOptions } from './defaults';

interface IUseReactTableMui extends ReactTableMuiOptionalProps {
  tableInstance: TableInstance<object>;
  options: ReactTableMuiOptions;
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
  options,
  ...rest
}) => {
  const tableInstance = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <ReactTableMuiContext.Provider
      value={{
        options: { ...defaultOptions, ...options },
        tableInstance,
        ...rest,
      }}
    >
      {children}
    </ReactTableMuiContext.Provider>
  );
};

export const useReactTableMui = (): IUseReactTableMui =>
  useContext(ReactTableMuiContext);
