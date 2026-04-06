import { functionalUpdate } from '@tanstack/react-table';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  MRT_ColumnOrderState,
  MRT_ColumnPinningState,
  MRT_ColumnSizingState,
  MRT_DensityState,
  MRT_ExpandedState,
  MRT_GroupingState,
  MRT_PaginationState,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_TableState,
  MRT_VisibilityState,
  UseServerTableStateOptions,
  UseServerTableStateReturn,
} from '../types';

export const useServerTableState = <TData extends MRT_RowData>({
  initialState,
  saveState,
  saveDebounceMs = 500,
}: UseServerTableStateOptions<TData>): UseServerTableStateReturn => {
  // --- State that triggers a data fetch ---
  const [pagination, setPagination] = useState<MRT_PaginationState>(
    initialState?.pagination ?? { pageIndex: 0, pageSize: 10 },
  );
  const [sorting, setSorting] = useState<MRT_SortingState>(
    initialState?.sorting ?? [],
  );
  const [grouping, setGrouping] = useState<MRT_GroupingState>(
    initialState?.grouping ?? [],
  );

  // --- State that is only persisted (does not trigger a fetch) ---
  const [columnSizing, setColumnSizing] = useState<MRT_ColumnSizingState>(
    initialState?.columnSizing ?? {},
  );
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    initialState?.columnVisibility ?? {},
  );
  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState | null>(
    initialState?.columnOrder ?? null,
  );
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>(
    initialState?.columnPinning ?? { left: [], right: [] },
  );
  const [density, setDensity] = useState<MRT_DensityState>(
    initialState?.density ?? 'compact',
  );
  const [expanded, setExpanded] = useState<MRT_ExpandedState>(
    initialState?.expanded ?? {},
  );
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>(
    initialState?.rowSelection ?? {},
  );

  // --- Debounced save ---
  // saveState is optional — if not provided, do nothing
  const debouncedSave = useDebouncedCallback(
    (partial: Partial<MRT_TableState<TData>>) => {
      if (!saveState) return;

      // Use functional update pattern to always work with the latest values
      saveState({
        pagination,
        sorting,
        grouping,
        columnSizing,
        columnVisibility,
        ...(columnOrder !== null && { columnOrder }),
        columnPinning,
        density,
        expanded,
        rowSelection,
        ...partial, // override with the latest values
      } as MRT_TableState<TData>);
    },
    saveDebounceMs,
  );

  // --- Internal helper: creates a handler that updates state and debounced-saves ---
  const makePersistentHandler = <T>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    currentValue: T,
    stateKey: keyof MRT_TableState<TData>,
  ) => {
    return (updater: React.SetStateAction<T>) => {
      setter(updater);
      debouncedSave({
        [stateKey]: functionalUpdate(updater, currentValue),
      } as Partial<MRT_TableState<TData>>);
    };
  };

  return {
    tableState: {
      pagination,
      sorting,
      grouping,
      columnSizing,
      columnVisibility,
      ...(columnOrder !== null && { columnOrder }),
      columnPinning,
      density,
      expanded,
      rowSelection,
    },

    handlers: {
      // Fetch triggers — only update state, do not persist
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      onGroupingChange: setGrouping,

      // Persistent handlers — update state and debounced-save
      onColumnSizingChange: makePersistentHandler(
        setColumnSizing,
        columnSizing,
        'columnSizing',
      ),
      onColumnVisibilityChange: makePersistentHandler(
        setColumnVisibility,
        columnVisibility,
        'columnVisibility',
      ),
      onColumnOrderChange: (updater) => {
        const newValue = functionalUpdate(updater, columnOrder ?? []);
        setColumnOrder(newValue);
        debouncedSave({ columnOrder: newValue });
      },
      onColumnPinningChange: makePersistentHandler(
        setColumnPinning,
        columnPinning,
        'columnPinning',
      ),
      onDensityChange: makePersistentHandler(setDensity, density, 'density'),
      onExpandedChange: makePersistentHandler(
        setExpanded,
        expanded,
        'expanded',
      ),
      onRowSelectionChange: makePersistentHandler(
        setRowSelection,
        rowSelection,
        'rowSelection',
      ),
    },

    // Only these go into useEffect deps for the data fetch
    fetchTrigger: {
      pagination,
      sorting,
      grouping,
    },
  };
};
