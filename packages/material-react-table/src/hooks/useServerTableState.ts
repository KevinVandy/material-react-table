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
  // --- State koji triggeruje fetch ---
  const [pagination, setPagination] = useState<MRT_PaginationState>(
    initialState?.pagination ?? { pageIndex: 0, pageSize: 10 },
  );
  const [sorting, setSorting] = useState<MRT_SortingState>(
    initialState?.sorting ?? [],
  );
  const [grouping, setGrouping] = useState<MRT_GroupingState>(
    initialState?.grouping ?? [],
  );

  // --- State koji se samo sprema (ne triggeruje fetch) ---
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
  // saveState je opcionalan — ako ga nema, ne radimo ništa
  const debouncedSave = useDebouncedCallback(
    (partial: Partial<MRT_TableState<TData>>) => {
      if (!saveState) return;

      // Koristimo functional update pattern da uvijek imamo svježi state
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
        ...partial, // override sa najsvježijim vrijednostima
      } as MRT_TableState<TData>);
    },
    saveDebounceMs,
  );

  // --- Helper: napravi handler koji setuje state i debounced sprema ---
  // Ovo je interni helper, ne eksportujemo ga
  const makePersistentHandler = <T>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    currentValue: T,
    stateKey: keyof MRT_TableState<TData>,
  ) => {
    return (updater: React.SetStateAction<T>) => {
      console.log(`Updating ${stateKey} and saving state...`);
      setter(updater);
      // if (!isMounted.current) return;
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
      // Fetch trigeri — samo setuju state, ne persistuju
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      onGroupingChange: setGrouping,

      // Persistent handleri — setuju + debounced snimaju
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

    // Samo ovo ide u useEffect deps za fetch
    fetchTrigger: {
      pagination,
      sorting,
      grouping,
    },
  };
};
