export interface MRT_Localization {
  actions: string;
  cancel: string;
  changeFilterMode: string;
  changeSearchMode: string;
  clearFilter: string;
  clearSearch: string;
  clearSort: string;
  clickToCopy: string;
  columnActions: string;
  copiedToClipboard: string;
  edit: string;
  expand: string;
  expandAll: string;
  filterBestMatch: string;
  filterBestMatchFirst: string;
  filterByColumn: string;
  filterContains: string;
  filterEmpty: string;
  filterEndsWith: string;
  filterEquals: string;
  filterGreaterThan: string;
  filterLessThan: string;
  filterMode: string;
  filterNotEmpty: string;
  filterNotEquals: string;
  filterStartsWith: string;
  filteringByColumn: string;
  groupByColumn: string;
  groupedBy: string;
  hideAll: string;
  hideColumn: string;
  pinToLeft: string;
  pinToRight: string;
  rowActions: string;
  rowNumber: string;
  rowNumbers: string;
  save: string;
  search: string;
  select: string;
  selectedCountOfRowCountRowsSelected: string;
  showAll: string;
  showAllColumns: string;
  showHideColumns: string;
  showHideFilters: string;
  showHideSearch: string;
  sortByColumnAsc: string;
  sortByColumnDesc: string;
  thenBy: string;
  toggleDensePadding: string;
  toggleFullScreen: string;
  toggleSelectAll: string;
  toggleSelectRow: string;
  ungroupByColumn: string;
  unpin: string;
}

export const MRT_DefaultLocalization_EN: MRT_Localization = {
  actions: 'Actions',
  cancel: 'Cancel',
  changeFilterMode: 'Change filter mode',
  changeSearchMode: 'Change search mode',
  clearFilter: 'Clear filter',
  clearSearch: 'Clear search',
  clearSort: 'Clear sort',
  clickToCopy: 'Click to copy',
  columnActions: 'Column Actions',
  copiedToClipboard: 'Copied to clipboard',
  edit: 'Edit',
  expand: 'Expand',
  expandAll: 'Expand all',
  filterBestMatch: 'Best Match',
  filterBestMatchFirst: 'Best Match First',
  filterByColumn: 'Filter by {column}',
  filterContains: 'Contains',
  filterEmpty: 'Empty',
  filterEndsWith: 'Ends With',
  filterEquals: 'Equals',
  filterGreaterThan: 'Greater Than',
  filterLessThan: 'Less Than',
  filterMode: 'Filter Mode: {filterType}',
  filterNotEmpty: 'Not Empty',
  filterNotEquals: 'Not Equals',
  filterStartsWith: 'Starts With',
  filteringByColumn: 'Filtering by {column} - {filterType} "{filterValue}"',
  groupByColumn: 'Group by {column}',
  groupedBy: 'Grouped by ',
  hideAll: 'Hide all',
  hideColumn: 'Hide {column} column',
  pinToLeft: 'Pin to left',
  pinToRight: 'Pin to right',
  rowActions: 'Row Actions',
  rowNumber: '#',
  rowNumbers: 'Row Numbers',
  save: 'Save',
  search: 'Search',
  selectedCountOfRowCountRowsSelected:
    '{selectedCount} of {rowCount} row(s) selected',
  select: 'Select',
  showAll: 'Show all',
  showAllColumns: 'Show all columns',
  showHideColumns: 'Show/Hide columns',
  showHideFilters: 'Show/Hide filters',
  showHideSearch: 'Show/Hide search',
  sortByColumnAsc: 'Sort by {column} ascending',
  sortByColumnDesc: 'Sort by {column} descending',
  thenBy: ', then by ',
  toggleDensePadding: 'Toggle dense padding',
  toggleFullScreen: 'Toggle full screen',
  toggleSelectAll: 'Toggle select all',
  toggleSelectRow: 'Toggle select row',
  ungroupByColumn: 'Ungroup by {column}',
  unpin: 'Unpin',
};
