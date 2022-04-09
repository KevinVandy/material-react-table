import {
  columnFilterRowsFn,
  createTable,
  expandRowsFn,
  functionalUpdate,
  groupRowsFn,
  paginateRowsFn,
  PaginationState,
  sortRowsFn,
  useTable,
} from '@tanstack/react-table';
import React, {
  Context,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import type {
  MRT_ColumnInterface,
  MRT_FilterType,
  MRT_Row,
  MRT_TableInstance,
} from '.';
import { MRT_ExpandAllButton } from './buttons/MRT_ExpandAllButton';
import { MRT_ExpandButton } from './buttons/MRT_ExpandButton';
import { MRT_ToggleRowActionMenuButton } from './buttons/MRT_ToggleRowActionMenuButton';
import { MRT_FILTER_TYPE } from './enums';
import { defaultFilterFNs } from './filtersFNs';
import { MRT_Icons } from './icons';
import { MRT_SelectCheckbox } from './inputs/MRT_SelectCheckbox';
import { MRT_Localization } from './localization';
import { MaterialReactTableProps } from './MaterialReactTable';
import {
  createDataColumn,
  createDisplayColumn,
  createGroup,
  getAllLeafColumnDefs,
} from './utils';

export type UseMRT<D extends Record<string, any> = {}> =
  MaterialReactTableProps<D> & {
    icons: MRT_Icons;
    idPrefix: string;
    filterTypes: { [key in MRT_FILTER_TYPE]: any };
    localization: MRT_Localization;
    setCurrentEditingRow: Dispatch<SetStateAction<MRT_Row<D> | null>>;
    setCurrentFilterTypes: Dispatch<
      SetStateAction<{
        [key: string]: MRT_FilterType;
      }>
    >;
    setCurrentGlobalFilterType: Dispatch<SetStateAction<MRT_FILTER_TYPE>>;
    setIsDensePadding: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setShowFilters: Dispatch<SetStateAction<boolean>>;
    setShowSearch: Dispatch<SetStateAction<boolean>>;
    tableInstance: MRT_TableInstance<D>;
  };

const MaterialReactTableContext = (<D extends Record<string, any> = {}>() =>
  createContext<UseMRT<D>>({} as UseMRT<D>) as Context<UseMRT<D>>)();

export const MaterialReactTableProvider = <D extends Record<string, any> = {}>(
  props: PropsWithChildren<MaterialReactTableProps<D>>,
) => {
  const idPrefix = useMemo(
    () => props.idPrefix ?? Math.random().toString(36).substring(2, 9),
    [props.idPrefix],
  );
  const [currentEditingRow, setCurrentEditingRow] = useState<MRT_Row | null>(
    null,
  );
  const [isDensePadding, setIsDensePadding] = useState(
    props.initialState?.isDensePadding ?? false,
  );
  const [isFullScreen, setIsFullScreen] = useState(
    props.initialState?.isFullScreen ?? false,
  );
  const [showFilters, setShowFilters] = useState(
    props.initialState?.showFilters ?? false,
  );
  const [showSearch, setShowSearch] = useState(
    props.initialState?.showSearch ?? false,
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: props.initialState?.pagination?.pageIndex ?? 0,
    pageSize: props.initialState?.pagination?.pageSize ?? 10,
    pageCount: props.initialState?.pagination?.pageCount ?? -1,
  });

  // const [currentFilterTypes, setCurrentFilterTypes] = useState<{
  //   [key: string]: MRT_FilterType;
  // }>(() =>
  //   Object.assign(
  //     {},
  //     ...findLowestLevelCols(props.columns).map((c) => ({
  //       [c.accessor as string]:
  //         c.filter ??
  //         props?.initialState?.filters?.[c.accessor as any] ??
  //         (!!c.filterSelectOptions?.length
  //           ? MRT_FILTER_TYPE.EQUALS
  //           : MRT_FILTER_TYPE.BEST_MATCH),
  //     })),
  //   ),
  // );

  // const [currentGlobalFilterType, setCurrentGlobalFilterType] = useState<
  //   MRT_FilterType | string | undefined
  // >(props.globalFilter);

  // const applyFiltersToColumns = useCallback(
  //   (cols: MRT_ColumnInterface[]) =>
  //     cols.map((column) => {
  //       if (column.columns) {
  //         applyFiltersToColumns(column.columns);
  //       } else {
  //         column.filter =
  //           props?.filterTypes?.[
  //             currentFilterTypes[column.accessor as string] as MRT_FILTER_TYPE
  //           ];
  //       }
  //       return column;
  //     }),
  //   [currentFilterTypes, props.filterTypes],
  // );

  // const columns = useMemo(
  //   () => applyFiltersToColumns(props.columns),
  //   [props.columns, applyFiltersToColumns],
  // );

  const table = useMemo(() => createTable<{ Row: D }>(), []);

  const displayColumns = useMemo(
    () =>
      [
        (props.enableRowActions || props.enableRowEditing) &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_ToggleRowActionMenuButton row={cell.row as any} />
            ),
            header: props.localization?.actions,
            id: 'mrt-row-actions',
            maxWidth: 60,
            width: 60,
          }),
        (props.enableExpanded || props.enableGrouping) &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => <MRT_ExpandButton row={cell.row as any} />,
            Header: () =>
              props.enableExpandAll ? <MRT_ExpandAllButton /> : null,
            header: props.localization?.expand,
            id: 'mrt-expand',
            maxWidth: 40,
            width: 40,
          }),
        props.enableRowSelection &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => <MRT_SelectCheckbox row={cell.row as any} />,
            Header: () =>
              props.enableSelectAll ? <MRT_SelectCheckbox selectAll /> : null,
            header: props.localization?.select,
            id: 'mrt-select',
            maxWidth: 40,
            width: 40,
          }),
        props.enableRowNumbers &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => cell.row.index + 1,
            Header: () => '#',
            header: props.localization?.rowNumbers,
            id: 'mrt-row-numbers',
            maxWidth: 40,
            width: 40,
            minWidth: 40,
          }),
      ].filter(Boolean),
    [
      props.enableExpandAll,
      props.enableExpanded,
      props.enableRowActions,
      props.enableRowEditing,
      props.enableRowNumbers,
      props.enableRowSelection,
      props.enableSelectAll,
      props.localization,
    ],
  );

  const columns = useMemo(
    () =>
      table.createColumns([
        ...displayColumns,
        ...props.columns.map((column) =>
          column.columns
            ? createGroup(table, column as any)
            : createDataColumn(table, column as any),
        ),
      ] as any),
    [table, props.columns],
  );

  const data: D[] = useMemo(
    () =>
      !props.isLoading || !!props.data.length
        ? props.data
        : [...Array(10).fill(null)].map((_) =>
            Object.assign(
              {},
              ...getAllLeafColumnDefs(
                props.columns as MRT_ColumnInterface[],
              ).map((c) => ({
                [c.id]: null,
              })),
            ),
          ),
    [props.data, props.isLoading],
  );

  const tableInstance = useTable(table, {
    ...props,
    columnFilterRowsFn,
    columns,
    data,
    expandRowsFn: expandRowsFn,
    filterTypes: defaultFilterFNs,
    groupRowsFn: groupRowsFn,
    getSubRows: props.getSubRows ?? ((originalRow: D) => originalRow.subRows),
    paginateRowsFn: paginateRowsFn,
    onPaginationChange: (updater: any) =>
      setPagination((old) => functionalUpdate(updater, old)),
    sortRowsFn,
    state: {
      ...props.initialState,
      currentEditingRow,
      isDensePadding,
      isFullScreen,
      pagination,
      showFilters,
      showSearch,
      ...props.state,
    },
  } as any);

  

  return (
    <MaterialReactTableContext.Provider
      value={
        {
          ...props,
          idPrefix,
          setCurrentEditingRow,
          // setCurrentFilterTypes,
          // setCurrentGlobalFilterType,
          setIsDensePadding,
          setIsFullScreen,
          setShowFilters,
          setShowSearch,
          tableInstance,
        } as any
      }
    >
      {props.children}
    </MaterialReactTableContext.Provider>
  );
};

export const useMRT = <D extends Record<string, any> = {}>(): UseMRT<D> =>
  useContext<UseMRT<D>>(
    MaterialReactTableContext as unknown as Context<UseMRT<D>>,
  );
