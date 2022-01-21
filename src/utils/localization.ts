export interface MRT_Localization {
  expandAllButtonTitle?: string;
  expandButtonTitle?: string;
  showHideColumnsButtonTitle?: string;
  filterTextFieldPlaceholder?: string;
  filterTextFieldClearButtonTitle?: string;
  searchTextFieldPlaceholder?: string;
  searchTextFieldClearButtonTitle?: string;
}

export const defaultLocalization: MRT_Localization = {
  expandAllButtonTitle: 'Expand all',
  expandButtonTitle: 'Expand',
  showHideColumnsButtonTitle: 'Show/Hide columns',
  filterTextFieldPlaceholder: 'Filter',
  filterTextFieldClearButtonTitle: 'Clear filter',
  searchTextFieldPlaceholder: 'Search',
  searchTextFieldClearButtonTitle: 'Clear search',
};
