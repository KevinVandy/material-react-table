export interface MRT_Localization {
  expandAllButtonTitle?: string;
  expandButtonTitle?: string;
  filterTextFieldClearButtonTitle?: string;
  filterTextFieldPlaceholder?: string;
  searchTextFieldClearButtonTitle?: string;
  searchTextFieldPlaceholder?: string;
  showHideColumnsButtonTitle?: string;
  toggleTableHeadCommandMenuHideMenuItem?: string;
  toggleTableHeadCommandMenuButtonTitle?: string;
}

export const defaultLocalization: MRT_Localization = {
  expandAllButtonTitle: 'Expand all',
  expandButtonTitle: 'Expand',
  filterTextFieldClearButtonTitle: 'Clear filter',
  filterTextFieldPlaceholder: 'Filter',
  searchTextFieldClearButtonTitle: 'Clear search',
  searchTextFieldPlaceholder: 'Search',
  showHideColumnsButtonTitle: 'Show/Hide columns',
  toggleTableHeadCommandMenuHideMenuItem: 'Hide column',
  toggleTableHeadCommandMenuButtonTitle: 'Column Actions'
};
