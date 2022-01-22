export interface MRT_Localization {
  columnActionMenuButtonTitle?: string;
  columnActionMenuItemHideColumn?: string;
  columnActionMenuItemSortAsc?: string;
  columnActionMenuItemSortDesc?: string;
  expandAllButtonTitle?: string;
  expandButtonTitle?: string;
  filterTextFieldClearButtonTitle?: string;
  filterTextFieldPlaceholder?: string;
  searchTextFieldClearButtonTitle?: string;
  searchTextFieldPlaceholder?: string;
  showHideColumnsButtonTitle?: string;
}

export const defaultLocalization: MRT_Localization = {
  columnActionMenuButtonTitle: 'Column Actions',
  columnActionMenuItemHideColumn: 'Hide column',
  columnActionMenuItemSortAsc: 'Sort Ascending',
  columnActionMenuItemSortDesc: 'Sort Descending',
  expandAllButtonTitle: 'Expand all',
  expandButtonTitle: 'Expand',
  filterTextFieldClearButtonTitle: 'Clear filter',
  filterTextFieldPlaceholder: 'Filter',
  searchTextFieldClearButtonTitle: 'Clear search',
  searchTextFieldPlaceholder: 'Search',
  showHideColumnsButtonTitle: 'Show/Hide columns'
};
