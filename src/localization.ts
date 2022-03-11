export interface MRT_Localization {
  actions: string;
  changeFilterMode: string;
  columnActions: string;
  clearSort: string;
  groupByColumn: string;
  hideColumn: string;
  sortByColumnAsc: string;
  sortByColumnDesc: string;
  ungroupByColumn: string;
  hideAll: string;
  showAll: string;
  expandAll: string;
  expand: string;
  filteringByColumn: string;
  filterContains: string;
  filterEmpty: string;
  filterEndsWith: string;
  filterEquals: string;
  filterFuzzy: string;
  filterGreaterThan: string;
  filterLessThan: string;
  filterNotEmpty: string;
  filterNotEquals: string;
  filterStartsWith: string;
  filterMode: string;
  clearFilter: string;
  filterByColumn: string;
  cancel: string;
  save: string;
  rowActions: string;
  edit: string;
  clearSearch: string;
  search: string;
  toggleSelectAll: string;
  toggleSelectRow: string;
  showHideColumns: string;
  toggleDensePadding: string;
  showHideFilters: string;
  toggleFullScreen: string;
  showHideSearch: string;
  groupedBy: string;
  thenBy: string;
  selectedCountOfRowCountRowsSelected: string;
}

export const MRT_DefaultLocalization_EN: MRT_Localization = {
  actions: 'Actions',
  changeFilterMode: 'Change filter mode',
  columnActions: 'Column Actions',
  clearSort: 'Clear sort',
  groupByColumn: 'Group by {column}',
  hideColumn: 'Hide {column} column',
  sortByColumnAsc: 'Sort by {column} ascending',
  sortByColumnDesc: 'Sort by {column} descending',
  ungroupByColumn: 'Ungroup by {column}',
  hideAll: 'Hide all',
  showAll: 'Show all',
  expandAll: 'Expand all',
  expand: 'Expand',
  filteringByColumn: 'Filtering by {column} - ({filterType})',
  filterContains: 'Contains Exact',
  filterEmpty: 'Empty',
  filterEndsWith: 'Ends With',
  filterEquals: 'Equals',
  filterFuzzy: 'Fuzzy Match (Default)',
  filterGreaterThan: 'Greater Than',
  filterLessThan: 'Less Than',
  filterNotEmpty: 'Not Empty',
  filterNotEquals: 'Not Equals',
  filterStartsWith: 'Starts With',
  filterMode: 'Filter Mode',
  clearFilter: 'Clear filter',
  filterByColumn: 'Filter by {column}',
  cancel: 'Cancel',
  save: 'Save',
  rowActions: 'Row Actions',
  edit: 'Edit',
  clearSearch: 'Clear search',
  search: 'Search',
  toggleSelectAll: 'Toggle select all',
  toggleSelectRow: 'Toggle select row',
  showHideColumns: 'Show/Hide columns',
  toggleDensePadding: 'Toggle dense padding',
  showHideFilters: 'Show/Hide filters',
  toggleFullScreen: 'Toggle full screen',
  showHideSearch: 'Show/Hide search',
  groupedBy: 'Grouped by ',
  thenBy: ', then by ',
  selectedCountOfRowCountRowsSelected:
    '{selectedCount} of {rowCount} row(s) selected',
};
