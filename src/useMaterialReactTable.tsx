import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';
import {
  TableInstance,
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { MaterialReactTableProps } from '.';

interface UseMaterialReactTable<D extends {}>
  extends MaterialReactTableProps<D> {
  tableInstance: TableInstance<D>;
}

const MaterialReactTableContext = (<D extends {}>() =>
  createContext<UseMaterialReactTable<D>>(
    {} as UseMaterialReactTable<D>,
  ) as Context<UseMaterialReactTable<D>>)();

export const MaterialReactTableProvider = <D extends {}>({
  children,
  columns,
  data,
  ...rest
}: PropsWithChildren<MaterialReactTableProps<D>>) => {
  const tableInstance = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  );

  return (
    <MaterialReactTableContext.Provider
      //@ts-ignore
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

export const useMaterialReactTable = <
  D extends {},
>(): UseMaterialReactTable<D> =>
  //@ts-ignore
  useContext<UseMaterialReactTable<D>>(MaterialReactTableContext);
