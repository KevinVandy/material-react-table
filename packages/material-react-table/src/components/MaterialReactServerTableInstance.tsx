import { useEffect, useState } from 'react';
import { useMaterialReactTable } from '../hooks/useMaterialReactTable';
import {
  MRT_GroupingState,
  MRT_PaginationState,
  MRT_RowData,
  MRT_SortingState,
  MRT_TableConfig,
  MRT_TableData,
  MRT_TableState,
} from '../types';
import { MaterialReactTable } from './MaterialReactTable';

type MaterialReactServerTableInstanceProps<TData extends MRT_RowData> = {
  config: MRT_TableConfig<TData>;
  loadData: (
    currentState: MRT_TableState<TData>,
  ) => Promise<MRT_TableData<TData>>;
};

export const MaterialReactServerTableInstance = <TData extends MRT_RowData>({
  config,
  loadData,
}: MaterialReactServerTableInstanceProps<TData>) => {
  const [data, setData] = useState<TData[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<MRT_PaginationState>(
    config.initialState?.pagination ?? { pageIndex: 0, pageSize: 10 },
  );
  const [sorting, setSorting] = useState<MRT_SortingState>(
    config.initialState?.sorting ?? [],
  );
  const [grouping, setGrouping] = useState<MRT_GroupingState>(
    config.initialState?.grouping ?? [],
  );

  const table = useMaterialReactTable<TData>({
    columns: config.columns,
    data,
    initialState: config.initialState,
    rowCount,
    manualPagination: true,
    manualSorting: true,
    manualGrouping: true,
    state: {
      showSkeletons: isLoading,
      pagination,
      sorting,
      grouping,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
  });

  const fetchData = async (state: MRT_TableState<TData>) => {
    setIsLoading(true);
    try {
      const { data: newData, rowCount: newRowCount } = await loadData(state);
      setData(newData);
      setRowCount(newRowCount);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData(table.getState());
  }, [sorting, pagination, grouping]);

  return <MaterialReactTable table={table} />;
};
