import React from 'react';
import { Meta } from '@storybook/react';
import MaterialReactTable, { type TRT_ColumnDef } from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Fixed Bugs/Grid Layout',
};

export default meta;

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
};

const columns: TRT_ColumnDef<Person>[] = [
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

export const CenterAlignInGridLayoutMode = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      muiTableHeadCellProps={{
        align: 'center',
      }}
      muiTableBodyCellProps={{
        align: 'center',
      }}
    />
  );
};

export const RightAlignInGridLayoutMode = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      muiTableHeadCellProps={{
        align: 'right',
      }}
      muiTableBodyCellProps={{
        align: 'right',
      }}
    />
  );
};
