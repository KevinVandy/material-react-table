import React, { createContext, FC, useContext } from 'react';
import {
  TableInstance,
  useExpanded,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { MaterialReactTableProps } from '.';

interface IUseMaterialReactTable extends MaterialReactTableProps {
  tableInstance: TableInstance<object>;
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
  ...rest
}) => {
  const tableInstance = useTable(
    { columns, data },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  );

  return (
    <MaterialReactTableContext.Provider
      value={{
        columns,
        data,
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
