import React from 'react';
import { Meta } from '@storybook/react';
import MaterialReactTable, { type TRT_ColumnDef } from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Row Height Examples',
};

export default meta;

const columns: TRT_ColumnDef<(typeof data)[0]>[] = [
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
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(25)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number({ min: 20, max: 60 }),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const SetRowHeight = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyRowProps={{
      sx: {
        height: '10px',
      },
    }}
    muiTableBodyCellProps={{
      sx: {
        p: '2px 16px',
      },
    }}
  />
);
