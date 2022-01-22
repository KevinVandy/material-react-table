export interface MRT_Localization {
  columnActionMenuButtonTitle?: string;
  columnActionMenuItemHideColumn?: string;
  columnActionMenuItemSortAsc?: string;
  columnActionMenuItemClearSort?: string;
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
  columnActionMenuItemSortAsc: 'Sort ascending',
  columnActionMenuItemClearSort: 'Clear sorting',
  columnActionMenuItemSortDesc: 'Sort descending',
  expandAllButtonTitle: 'Expand all',
  expandButtonTitle: 'Expand',
  filterTextFieldClearButtonTitle: 'Clear filter',
  filterTextFieldPlaceholder: 'Filter',
  searchTextFieldClearButtonTitle: 'Clear search',
  searchTextFieldPlaceholder: 'Search',
  showHideColumnsButtonTitle: 'Show/Hide columns'
};
