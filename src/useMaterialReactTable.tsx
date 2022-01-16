import React, { createContext, FC, useContext } from 'react';
import {
  TableInstance,
  useExpanded,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import {
  MaterialReactTableOptionalProps,
  MaterialReactTableOptions,
  MaterialReactTableProps,
} from '.';
import { defaultOptions } from './defaults';

interface IUseMaterialReactTable extends MaterialReactTableOptionalProps {
  tableInstance: TableInstance<object>;
  options: MaterialReactTableOptions;
}

const MaterialReactTableContext = createContext<IUseMaterialReactTable>(
  {} as IUseMaterialReactTable,
);

interface ProviderProps extends MaterialReactTableProps {
  children: React.ReactNode;
}

export const MaterialReactTableProvider: FC<ProviderProps> = ({
  children,
  columns,
  data,
  options,
  ...rest
}) => {
  const tableInstance = useTable(
    { columns, data },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <MaterialReactTableContext.Provider
      value={{
        options: { ...defaultOptions, ...options },
        tableInstance,
        ...rest,
      }}
    >
      {children}
    </MaterialReactTableContext.Provider>
  );
};

export const useMaterialReactTable = (): IUseMaterialReactTable =>
  useContext(MaterialReactTableContext);
