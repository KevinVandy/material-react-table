import React, { useMemo } from 'react';
import { TRT_Localization_EN } from './_locales/en';
import { TRT_AggregationFns } from './aggregationFns';
import { TRT_DefaultColumn, TRT_DefaultDisplayColumn } from './column.utils';
import { TRT_FilterFns } from './filterFns';
import { TRT_Default_Icons } from './icons';
import { TRT_SortingFns } from './sortingFns';
import { TRT_TableRoot } from './table/TRT_TableRoot';

import { TailwindCSSReactTableProps } from './TailwindCSSReactTable.d';

export { TRT_AggregationFns, TRT_FilterFns, TRT_SortingFns };

const TailwindCSSReactTable = <TData extends Record<string, any> = {}>({
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
}: TailwindCSSReactTableProps<TData>) => {
  const _icons = useMemo(() => ({ ...TRT_Default_Icons, ...icons }), [icons]);
  const _localization = useMemo(
    () => ({
      ...TRT_Localization_EN,
      ...localization,
    }),
    [localization],
  );
  const _aggregationFns = useMemo(
    () => ({ ...TRT_AggregationFns, ...aggregationFns }),
    [],
  );
  const _filterFns = useMemo(() => ({ ...TRT_FilterFns, ...filterFns }), []);
  const _sortingFns = useMemo(() => ({ ...TRT_SortingFns, ...sortingFns }), []);
  const _defaultColumn = useMemo(
    () => ({ ...TRT_DefaultColumn, ...defaultColumn }),
    [defaultColumn],
  );
  const _defaultDisplayColumn = useMemo(
    () => ({
      ...TRT_DefaultDisplayColumn,
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
    <TRT_TableRoot
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

export default TailwindCSSReactTable;
