export const showOverrideWarnings = (props: any) => {
  if (props.OverrideTableBodyCellComponent) {
    showWarning('TableCell', 'props');
  }
  if (props.OverrideTableBodyComponent) {
    showWarning('TableBody', 'tableBodyProps');
  }
  if (props.OverrideTableBodyRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.OverrideTableDetailPanelComponent) {
    showWarning('Detail Panel', 'tableDetailPanelProps');
  }
  if (props.OverrideTableFooterComponent) {
    showWarning('TableFooter', 'tableFooterProps');
  }
  if (props.OverrideTableFooterCellComponent) {
    showWarning('TableCell', 'props');
  }
  if (props.OverrideTableFooterRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.OverrideTableHeadComponent) {
    showWarning('TableHead', 'tableHeadProps');
  }
  if (props.OverrideTableHeadRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.OverrideTablePaginationComponent) {
    showWarning('', 'props');
  }
  if (props.OverrideTableToolbarComponent) {
    showWarning('TableBodyCell', 'props');
  }
};

const showWarning = (componentName: string, propsName: string) => {
  console.warn(
    `Caution.\nYou are overriding the built-in Mui ${componentName} Component in material-react-table.\n\nYou should only use this as a last resort!\n\nConsider customizing the Mui ${componentName} Component instead with ${propsName}.`,
  );
};
