import { useTableOptions } from './useTableOptions';
import { useMaterialReactTableInstance } from './useMaterialReactTableInstance';
import { type MRT_TableInstance, type MRT_TableOptions } from './types';

export const useMaterialReactTable = <TData extends Record<string, any>>(
  tableOptions: MRT_TableOptions<TData>,
): MRT_TableInstance<TData> => {
  const parsedTableOptions = useTableOptions(tableOptions);
  const tableInstance = useMaterialReactTableInstance(parsedTableOptions);
  return tableInstance;
};
