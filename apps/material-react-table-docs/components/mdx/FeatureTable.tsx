import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    id: 'feature',
    accessorKey: 'feature',
    header: 'Feature',
  },
  {
    accessorKey: 'mrt',
    header: 'Material React Table',
    muiTableHeadCellProps: {
      align: 'center',
      sx: (theme) => ({
        color: theme.palette.primary.main,
      }),
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell: ({ cell }) =>
      cell.getValue() === true ? '✅' : cell.getValue() === false ? '❌' : '⚠️',
  },
  {
    accessorKey: 'mt',
    header: 'Material Table',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell: ({ cell }) =>
      cell.getValue() === true ? '✅' : cell.getValue() === false ? '❌' : '⚠️',
  },
  {
    accessorKey: 'muix',
    header: 'Material UI X',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell: ({ cell }) =>
      cell.getValue() === true ? '✅' : cell.getValue() === false ? '❌' : '⚠️',
  },
];

const data = [
  {
    feature: 'Click to copy',
    mrt: true,
    mt: false,
    muix: false,
  },
  {
    feature: 'Column Action Dropdown',
    mrt: true,
    mt: false,
    muix: true,
  },
  {
    feature: 'Column/Row Grouping and Aggregation',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Column Hiding',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Column Ordering (DnD)',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Column Pinning (Freezing)',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Column Resizing',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Column Spanning',
    mrt: false,
    mt: null,
    muix: true,
  },
  {
    feature: 'Column Virtualization',
    mrt: true,
    mt: null,
    muix: true,
  },
  {
    feature: 'Custom Icons',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Data Editing',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Density Toggle',
    mrt: true,
    mt: false,
    muix: true,
  },
  {
    feature: 'Detail Panels',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Export to CSV',
    mrt: null,
    mt: true,
    muix: true,
  },
  {
    feature: 'Filtering',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Same Column Multi-Filtering',
    mrt: false,
    mt: false,
    muix: true,
  },
  {
    feature: 'Filter Modes',
    mrt: true,
    mt: false,
    muix: true,
  },
  {
    feature: 'Fullscreen Mode',
    mrt: true,
    mt: false,
    muix: false,
  },
  {
    feature: 'Global Filtering Search',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Header Groups and Footers',
    mrt: true,
    mt: false,
    muix: true,
  },
  {
    feature: 'Localization (i18n)',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Manage your own state',
    mrt: true,
    mt: false,
    muix: null,
  },
  {
    feature: 'Pagination',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Row Action Buttons',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Row Numbers',
    mrt: true,
    mt: false,
    muix: false,
  },
  {
    feature: 'Row Ordering (DnD)',
    mrt: true,
    mt: false,
    muix: true,
  },
  {
    feature: 'Row Pinning',
    mrt: true,
    mt: false,
    muix: true,
  },
  {
    feature: 'Row Selection',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Row Spanning',
    mrt: false,
    mt: false,
    muix: null,
  },
  {
    feature: 'SSR Compatibility',
    mrt: true,
    mt: null,
    muix: true,
  },
  {
    feature: 'Sorting',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Theming',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Customize Toolbars',
    mrt: true,
    mt: null,
    muix: true,
  },
  {
    feature: 'Expanding Rows (Tree Data)',
    mrt: true,
    mt: true,
    muix: true,
  },
  {
    feature: 'Virtualization',
    mrt: true,
    mt: null,
    muix: true,
  },
];

export const FeatureTable = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enablePagination={false}
      enableColumnActions={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      enableColumnPinning
      initialState={{
        sorting: [{ id: 'feature', desc: false }],
        density: 'compact',
        columnPinning: { left: ['feature'] },
      }}
    />
  );
};
