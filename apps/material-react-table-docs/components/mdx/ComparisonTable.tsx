import { Box, Link, Paper } from '@mui/material';
import {
  MRT_TableContainer,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'library',
    header: 'Library',
    size: 250,
    Cell: ({ cell, row }) => (
      <Link
        href={row.original.libraryLink}
        target="_blank"
        rel="noopener"
        sx={(theme) => ({
          color:
            cell.getValue() === 'Material React Table'
              ? theme.palette.primary.main
              : cell.getValue() === 'Mantine React Table'
                ? theme.palette.secondary.light
                : cell.getValue() === 'TanStack Table (React Table)'
                  ? theme.palette.error.main
                  : theme.palette.text.primary,
          fontWeight: 'bold',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        })}
      >
        <>{cell.getValue()}</>
      </Link>
    ),
  },
  {
    accessorKey: 'freeOrLicensed',
    header: 'Free or Licensed',
    size: 80,
  },
  {
    accessorKey: 'bundleSize',
    header: 'Bundle Size',
    Cell: ({ cell, row }) => (
      <Box sx={{ display: 'flex', alignContent: 'center', gap: '1ch' }}>
        {`${cell.getValue<string>()} KB`}
        <a href={row.original.bundlePhobiaLink} target="_blank" rel="noopener">
          <img
            alt={cell.getValue<string>()}
            loading="lazy"
            src={row.original.bundlePhobiaImg}
          />
        </a>
      </Box>
    ),
    size: 250,
    sortDescFirst: false,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 500,
  },
];

const data = [
  {
    library: 'Material React Table',
    libraryLink: '#',
    freeOrLicensed: 'Free MIT',
    bundleSize: 53,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/material-react-table@latest?color=blue',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/material-react-table@latest',
    description:
      'Built on top of TanStack Table V8 and Material UI V5, Material React Table (MRT) is a batteries-included React table library that attempts to provide all the table features you need while trying to stay as highly performant and lightweight as possible. Customization is treated as a top priority to let you override any styles you need to change. Initially built in 2022, so it is still somewhat new.',
  },
  {
    library: 'Mantine React Table',
    libraryLink: 'https://www.mantine-react-table.com',
    freeOrLicensed: 'Free MIT',
    bundleSize: 48,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/mantine-react-table@latest?color=blue',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/mantine-react-table@latest',
    description:
      'Mantine React Table is Material React Table\'s sister library. It was forked from Material React Table and just uses Mantine instead of Material UI. If you want a more "pure" CSS component library to use with MRT, or you are a Tailwind user, then Mantine React Table might actually be a better fit for you.',
  },
  {
    library: 'TanStack Table (React Table)',
    libraryLink: 'https://tanstack.com/table',
    freeOrLicensed: 'Free MIT',
    bundleSize: 14,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/@tanstack/react-table@latest',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/@tanstack/react-table@latest',
    description:
      'TanStack Table (formerly React Table) is a lightweight Headless UI library for building powerful tables and datagrids. No CSS or components included. You use logic from the useReactTable hook to build your own table components. No batteries included, but you get total control of your markup and styles (Material React Table is built on top of TanStack Table).',
  },
  {
    library: 'Material Table',
    libraryLink: 'https://material-table.com',
    freeOrLicensed: 'Free MIT',
    bundleSize: 185,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/material-table?color=red',
    bundlePhobiaLink: 'https://bundlephobia.com/package/material-table@latest',
    description:
      'Material Table is a once-popular Material UI table library originally built in 2018 for creating Material UI tables that includes tons of features. However, it has a very large bundle size and contains outdated and insecure dependencies. It is mostly unmaintained now but did recently release a version that was somewhat compatible with Material UI V5.',
  },
  {
    library: 'MUI Datatables',
    libraryLink: 'https://github.com/gregnb/mui-datatables',
    freeOrLicensed: 'Free MIT',
    bundleSize: 96,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/mui-datatables?color=orange',
    bundlePhobiaLink: 'https://bundlephobia.com/package/mui-datatables@latest',
    description:
      'MUI Datatables is a solid Material UI-based table library that was originally built in 2017. It has a lot of features and is very customizable. However, it is not as lightweight as MRT and has a lot of dependencies. The library appears to still be kept up to date occasionally, but its documentation site is no longer available. Some of the UI layouts in MUI Datatables served as inspiration for Material React Table.',
  },
  {
    library: 'MUI X Data Grid MIT/Pro/Premium',
    libraryLink: 'https://mui.com/store/items/mui-x-premium/',
    freeOrLicensed: 'MIT or Paid License',
    bundleSize: 135,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/@mui/x-data-grid-pro?color=orange',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/@mui/x-data-grid-pro@latest',
    description:
      'MUI X Data Grid MIT/Pro/Premium is one of the best Material UI Data Grid options available and it comes directly from MUI. It includes the full suite of features you may need but requires a paid license for many of the advanced features.',
  },
  {
    library: 'AG Grid Community/Enterprise',
    libraryLink: 'https://www.ag-grid.com/license-pricing',
    freeOrLicensed: 'MIT or Paid License',
    bundleSize: 332,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/ag-grid-enterprise?color=red',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/ag-grid-enterprise@latest',
    description:
      'AG Grid Community/Enterprise is arguably the best table library of all time, but many of the advanced features require an expensive paid license. It appears to have a very large bundle size, although this is a bit misleading because it is tree-shakable and includes a lot of the UI components in the bundle. It is not built on top of Material UI, but it does follow Material Design, so it is definitely relevant to this comparison.',
  },
];

export const ComparisonTable = () => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
  });

  return <MRT_TableContainer component={Paper} table={table} />;
};
