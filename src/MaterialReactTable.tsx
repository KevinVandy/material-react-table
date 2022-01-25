import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';
import {
  TableBodyProps,
  TableCellProps,
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TextFieldProps,
  ToolbarProps,
  TypographyProps,
} from '@mui/material';
import {
  ActionType,
  Cell,
  Column,
  HeaderGroup,
  Row,
  TableInstance,
  TableState,
  UseTableColumnOptions,
} from 'react-table';
import { MaterialReactTableProvider } from './useMaterialReactTable';
import { MRT_TableContainer } from './table/MRT_TableContainer';
import { defaultLocalization, MRT_Localization } from './utils/localization';

export interface MaterialReactTableProps<D extends {} = {}> {
  columns: Column<D | {}>[];
  data: D[];
  defaultColumn?: UseTableColumnOptions<D>;
  enableColumnActions?: boolean;
  enableColumnGrouping?: boolean;
  enableColumnHiding?: boolean;
  enableColumnReordering?: boolean;
  enableColumnResizing?: boolean;
  enableExpandAll?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  enableSubRowTree?: boolean;
  getRowId?: (
    originalRow?: Partial<Row<D>>,
    relativeIndex?: number,
    parent?: Row<D | {}>,
  ) => string;
  getSubRows?: (
    originalRow: Partial<Row<D>>,
    relativeIndex: number,
  ) => Row<D>[];
  initialState?: Partial<TableState<D>>;
  isLoading?: boolean;
  isFetching?: boolean;
  localization?: Partial<MRT_Localization>;
  onCellClick?: (
    event: MouseEvent<HTMLTableCellElement>,
    cell: Cell<D>,
  ) => void;
  onRowClick?: (event: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
  onRowExpandChange?: (
    event: MouseEvent<HTMLButtonElement>,
    row: Row<D>,
  ) => void;
  onRowSelectChange?: (
    event: ChangeEvent,
    row: Row<D>,
    selectedRows: Row<D>[],
  ) => void;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  positionPagination?: 'bottom' | 'top' | 'both';
  renderDetailPanel?: (rowData: Row<D>) => ReactNode;
  showFiltersInColumnHead?: boolean;
  showFooter?: boolean;
  showHead?: boolean;
  showToolbar?: boolean;
  stateReducer?: (
    newState: TableState<D>,
    action: ActionType,
    previousState: TableState<D>,
    tableInstance?: TableInstance<{} | D>,
  ) => TableState;
  surpressOverrideWarnings?: boolean;
  tableBodyProps?: TableBodyProps;
  tableContainerProps?: TableContainerProps;
  tableDetailPanelProps?: TableCellProps;
  tableFooterProps?: TableFooterProps;
  tableHeadProps?: TableHeadProps;
  tablePaginationProps?: TablePaginationProps;
  tableProps?: TableProps;
  tableSearchTextfieldProps?: TextFieldProps;
  tableTitleProps?: TypographyProps;
  tableToolbarProps?: ToolbarProps;
  title?: string | ReactNode;
  OverrideTableBodyCellComponent?(
    cell: Cell<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableBodyComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableBodyRowComponent?(
    row: Row<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableDetailPanelComponent?(
    row: Row<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableFooterCellComponent?(
    column: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableFooterComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableFooterRowComponent?(
    footerGroup: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableHeadCellComponent?(
    column: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableHeadComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableHeadRowComponent?(
    headerGroup: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTablePaginationComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableToolbarComponent?(tableInstance: TableInstance<D>): ReactNode;
}

export const MaterialReactTable = <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  enablePagination = true,
  enableSorting = true,
  enableSubRowTree = true,
  localization = defaultLocalization,
  positionPagination = 'bottom',
  showFiltersInColumnHead = true,
  showFooter = true,
  showHead = true,
  showToolbar = true,
  ...rest
}: MaterialReactTableProps<D>) => (
  <MaterialReactTableProvider
    defaultColumn={defaultColumn}
    enablePagination={enablePagination}
    enableSorting={enableSorting}
    enableSubRowTree={enableSubRowTree}
    localization={{ ...defaultLocalization, ...localization }}
    positionPagination={positionPagination}
    showFiltersInColumnHead={showFiltersInColumnHead}
    showFooter={showFooter}
    showHead={showHead}
    showToolbar={showToolbar}
    {...rest}
  >
    <MRT_TableContainer />
  </MaterialReactTableProvider>
);
