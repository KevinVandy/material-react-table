export const showoverrideWarnings = (props: any) => {
  if (props.overrideTableBodyCellComponent) {
    showWarning('TableCell', 'props');
  }
  if (props.overrideTableBodyComponent) {
    showWarning('TableBody', 'tableBodyProps');
  }
  if (props.overrideTableBodyRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.overrideTableDetailPanelComponent) {
    showWarning('Detail Panel', 'tableDetailPanelProps');
  }
  if (props.overrideTableFooterComponent) {
    showWarning('TableFooter', 'tableFooterProps');
  }
  if (props.overrideTableFooterCellComponent) {
    showWarning('TableCell', 'props');
  }
  if (props.overrideTableFooterRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.overrideTableHeadComponent) {
    showWarning('TableHead', 'tableHeadProps');
  }
  if (props.overrideTableHeadRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.overrideTablePaginationComponent) {
    showWarning('', 'props');
  }
  if (props.overrideTableToolbarComponent) {
    showWarning('TableBodyCell', 'props');
  }
};

const showWarning = (componentName: string, propsName: string) => {
  console.warn(
    `Caution.\nYou are overriding the built-in Mui ${componentName} Component in material-react-table.\n\nYou should only use this as a last resort!\n\nConsider customizing the Mui ${componentName} Component instead with ${propsName}.`,
  );
};
