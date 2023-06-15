import { useMemo } from 'react';
import { MRT_AggregationFns } from './aggregationFns';
import { MRT_FilterFns } from './filterFns';
import { MRT_SortingFns } from './sortingFns';
import { MRT_DefaultColumn, MRT_DefaultDisplayColumn } from './column.utils';
import { MRT_Default_Icons } from './icons';
import { MRT_Localization_EN } from './_locales/en';
import { MRT_TableRoot } from './table/MRT_TableRoot';
import { type MaterialReactTableProps } from './types';

export { MRT_AggregationFns, MRT_FilterFns, MRT_SortingFns };

export const MaterialReactTable = <TData extends Record<string, any> = {}>({
  aggregationFns,
  autoResetExpanded = false,
  columnResizeMode = 'onChange',
  defaultColumn,
  defaultDisplayColumn,
  editingMode = 'modal',
  enableBottomToolbar = true,
  enableColumnActions = true,
  enableColumnFilters = true,
  enableColumnOrdering = false,
  enableColumnResizing = false,
  enableDensityToggle = true,
  enableExpandAll = true,
  enableExpanding,
  enableFilterMatchHighlighting = true,
  enableFilters = true,
  enableFullScreenToggle = true,
  enableGlobalFilter = true,
  enableGlobalFilterRankedResults = true,
  enableGrouping = false,
  enableHiding = true,
  enableMultiRowSelection = true,
  enableMultiSort = true,
  enablePagination = true,
  enablePinning = false,
  enableRowSelection = false,
  enableSelectAll = true,
  enableSorting = true,
  enableStickyHeader = false,
  enableTableFooter = true,
  enableTableHead = true,
  enableToolbarInternalActions = true,
  enableTopToolbar = true,
  filterFns,
  icons,
  layoutMode = 'semantic',
  localization,
  manualFiltering,
  manualGrouping,
  manualPagination,
  manualSorting,
  positionActionsColumn = 'first',
  positionExpandColumn = 'first',
  positionGlobalFilter = 'right',
  positionPagination = 'bottom',
  positionToolbarAlertBanner = 'top',
  positionToolbarDropZone = 'top',
  rowNumberMode = 'original',
  selectAllMode = 'page',
  sortingFns,
  ...rest
}: MaterialReactTableProps<TData>) => {
  const _icons = useMemo(() => ({ ...MRT_Default_Icons, ...icons }), [icons]);
  const _localization = useMemo(
    () => ({
      ...MRT_Localization_EN,
      ...localization,
    }),
    [localization],
  );
  const _aggregationFns = useMemo(
    () => ({ ...MRT_AggregationFns, ...aggregationFns }),
    [],
  );
  const _filterFns = useMemo(() => ({ ...MRT_FilterFns, ...filterFns }), []);
  const _sortingFns = useMemo(() => ({ ...MRT_SortingFns, ...sortingFns }), []);
  const _defaultColumn = useMemo(
    () => ({ ...MRT_DefaultColumn, ...defaultColumn }),
    [defaultColumn],
  );
  const _defaultDisplayColumn = useMemo(
    () => ({
      ...MRT_DefaultDisplayColumn,
      ...defaultDisplayColumn,
    }),
    [defaultDisplayColumn],
  );

  if (rest.enableRowVirtualization || rest.enableColumnVirtualization) {
    layoutMode = 'grid';
  }

  if (rest.enableRowVirtualization) {
    enableStickyHeader = true;
  }

  if (enablePagination === false && manualPagination === undefined) {
    manualPagination = true;
  }

  if (!rest.data?.length) {
    manualFiltering = true;
    manualGrouping = true;
    manualPagination = true;
    manualSorting = true;
  }

  return (
    <MRT_TableRoot
      aggregationFns={_aggregationFns}
      autoResetExpanded={autoResetExpanded}
      columnResizeMode={columnResizeMode}
      defaultColumn={_defaultColumn}
      defaultDisplayColumn={_defaultDisplayColumn}
      editingMode={editingMode}
      enableBottomToolbar={enableBottomToolbar}
      enableColumnActions={enableColumnActions}
      enableColumnFilters={enableColumnFilters}
      enableColumnOrdering={enableColumnOrdering}
      enableColumnResizing={enableColumnResizing}
      enableDensityToggle={enableDensityToggle}
      enableExpandAll={enableExpandAll}
      enableExpanding={enableExpanding}
      enableFilterMatchHighlighting={enableFilterMatchHighlighting}
      enableFilters={enableFilters}
      enableFullScreenToggle={enableFullScreenToggle}
      enableGlobalFilter={enableGlobalFilter}
      enableGlobalFilterRankedResults={enableGlobalFilterRankedResults}
      enableGrouping={enableGrouping}
      enableHiding={enableHiding}
      enableMultiRowSelection={enableMultiRowSelection}
      enableMultiSort={enableMultiSort}
      enablePagination={enablePagination}
      enablePinning={enablePinning}
      enableRowSelection={enableRowSelection}
      enableSelectAll={enableSelectAll}
      enableSorting={enableSorting}
      enableStickyHeader={enableStickyHeader}
      enableTableFooter={enableTableFooter}
      enableTableHead={enableTableHead}
      enableToolbarInternalActions={enableToolbarInternalActions}
      enableTopToolbar={enableTopToolbar}
      filterFns={_filterFns}
      icons={_icons}
      layoutMode={layoutMode}
      localization={_localization}
      manualFiltering={manualFiltering}
      manualGrouping={manualGrouping}
      manualPagination={manualPagination}
      manualSorting={manualSorting}
      positionActionsColumn={positionActionsColumn}
      positionExpandColumn={positionExpandColumn}
      positionGlobalFilter={positionGlobalFilter}
      positionPagination={positionPagination}
      positionToolbarAlertBanner={positionToolbarAlertBanner}
      positionToolbarDropZone={positionToolbarDropZone}
      rowNumberMode={rowNumberMode}
      selectAllMode={selectAllMode}
      sortingFns={_sortingFns}
      {...rest}
    />
  );
};

/**
 * @deprecated Use named exports instead of default export (will be removed in v2)
 * @example import { MaterialReactTable } from 'material-react-table';
 */
export default MaterialReactTable;
