import React from 'react';
import { Meta } from '@storybook/react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { faker } from '@faker-js/faker';
import { Button, MenuItem } from '@mui/material';

const meta: Meta = {
  title: 'Fixed Bugs/Click Propagation',
};

export default meta;

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
};

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
];

const data = [...Array(6)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const RowClickAndRowMenuActions = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
      enableEditing
      renderRowActionMenuItems={() => [<MenuItem>Test</MenuItem>]}
      muiTableBodyRowProps={{
        onClick: () => {
          alert('row click');
        },
      }}
    />
  );
};

export const RowClickAndRowButtonActions = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
      enableEditing
      renderRowActions={() => (
        <Button onClick={(e) => e.stopPropagation()}>Test</Button>
      )}
      muiTableBodyRowProps={{
        onClick: () => {
          alert('row click');
        },
      }}
    />
  );
};
