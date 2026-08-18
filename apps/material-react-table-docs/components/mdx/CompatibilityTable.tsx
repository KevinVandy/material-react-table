import React from 'react';
import {
  MRT_ColumnDef,
  MRT_TableContainer,
  useMaterialReactTable,
} from 'material-react-table';

const columns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: 'mrtVersion',
    header: 'MRT',
  },
  {
    accessorKey: 'reactVersion',
    header: 'React',
    size: 100,
  },
  {
    accessorKey: 'muiVersion',
    header: 'Material UI',
    size: 100,
  },
  {
    accessorKey: 'muiIconsVersion',
    header: ' MUI Icons',
    size: 100,
  },
  {
    accessorKey: 'muiXDatePickers',
    header: 'MUI X Date Pickers',
  },
  {
    accessorKey: 'emotionVersion',
    header: 'Emotion',
    size: 100,
  },
  {
    accessorKey: 'pigmentCSS',
    header: 'Pigment CSS',
  },
];

const data = [
  {
    mrtVersion: '1.x',
    muiVersion: '5.0+',
    muiXDatePickers: 'Optional',
    reactVersion: '17.0+',
    muiIconsVersion: '5.0+',
    emotionVersion: '11.0+',
    pigmentCSS: '-',
  },
  {
    mrtVersion: '2.x',
    muiVersion: '5.13+',
    muiXDatePickers: '6.15+',
    reactVersion: '17.0+',
    muiIconsVersion: '5.0+',
    emotionVersion: '11.0+',
    pigmentCSS: '-',
  },
  {
    mrtVersion: '3.x (This Version)',
    muiVersion: '6.0+ / tested with 9.x',
    muiXDatePickers: '7.15.0+',
    reactVersion: '18.0+',
    muiIconsVersion: '6.0+ / tested with 9.x',
    emotionVersion: '11.0+',
    pigmentCSS: 'Optional',
  },
  {
    mrtVersion: '4.x (Next Version)',
    muiVersion: '6.0+',
    muiXDatePickers: '7.15.0+',
    reactVersion: '18.0+',
    muiIconsVersion: '6.0+',
    emotionVersion: 'Optional',
    pigmentCSS: 'Optional',
  },
];

export const CompatibilityTable = () => {
  const table = useMaterialReactTable({
    columns,
    data,
    defaultColumn: {
      muiTableHeadCellProps: {
        sx: {
          fontSize: '16px',
        },
      },
      muiTableBodyCellProps: ({ row }) => ({
        sx: (theme) => ({
          fontSize: '16px',
          fontWeight: row.original.mrtVersion.includes('This Version')
            ? 'bold'
            : 'normal',
          color: row.original.mrtVersion.includes('This Version')
            ? `${theme.palette.primary.main}`
            : 'inherit',
        }),
      }),
    },
    enableColumnActions: false,
    initialState: {
      sorting: [
        {
          id: 'mrtVersion',
          desc: true,
        },
      ],
    },
  });
  return <MRT_TableContainer table={table} />;
};
