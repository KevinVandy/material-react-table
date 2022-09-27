import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';
import { Box } from '@mui/material';

const meta: Meta = {
  title: 'Styling/Style Table Head Cells',
};

export default meta;

const columns: MRT_ColumnDef<typeof data[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
];
const data = [...Array(21)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const DefaultTableHeadCellStyles: Story<
  MaterialReactTableProps
> = () => <MaterialReactTable columns={columns} data={data} />;

export const StyleAllMuiTableHeadCell: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableHeadCellProps={{
      sx: {
        backgroundColor: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
        color: '#fff',
      },
    }}
  />
);

export const StyleTableHeadCellsIndividually: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        muiTableHeadCellProps: {
          sx: (theme) => ({ color: theme.palette.primary.main }),
        },
      },
      {
        header: 'Age',
        accessorKey: 'age',
        muiTableHeadCellProps: {
          sx: {
            color: 'red',
          },
        },
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
    ]}
    data={data}
  />
);

export const CustomHeadCellRenders: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
        Header: <em>First Name</em>,
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        Header: () => <em>Last Name</em>,
      },
      {
        header: 'Current Age',
        accessorKey: 'age',
        Header: ({ column }) => (
          <Box color="primary.main">{column.columnDef.header}</Box>
        ),
      },
      {
        header: 'Address of Residence (Permanent)',
        accessorKey: 'address',
      },
    ]}
    data={data}
    enableColumnResizing
  />
);
