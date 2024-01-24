import Box from '@mui/material/Box';
import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Style Table Head Cells',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];
const data = [...Array(21)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const DefaultTableHeadCellStyles = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const ColorSortIcon = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableHeadCellProps={({ column }) => ({
      sx: {
        '& .MuiTableSortLabel-root svg': {
          color: column.getIsSorted() ? 'limegreen !important' : undefined,
        },
      },
    })}
  />
);

export const StyleAllMuiTableHeadCell = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableHeadCellProps={{
      sx: (theme) => ({
        background: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
        color: theme.palette.text.primary,
      }),
    }}
  />
);

export const StyleTableHeadCellsIndividually = () => (
  <MaterialReactTable
    columns={[
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        muiTableHeadCellProps: {
          sx: (theme) => ({ color: theme.palette.primary.main }),
        },
      },
      {
        accessorKey: 'age',
        header: 'Age',
        muiTableHeadCellProps: {
          sx: {
            color: 'red',
          },
        },
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
    ]}
    data={data}
  />
);

export const CustomHeadCellRenders = () => (
  <MaterialReactTable
    columns={[
      {
        Header: <em>First Name</em>,
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        Header: () => <em>Last Name</em>,
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        Header: ({ column }) => (
          <Box color="primary.main">{column.columnDef.header}</Box>
        ),
        accessorKey: 'age',
        header: 'Current Age',
      },
      {
        accessorKey: 'address',
        header: 'Address of Residence (Permanent)',
      },
    ]}
    data={data}
    enableColumnResizing
  />
);
