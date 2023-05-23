import { Meta } from '@storybook/react';
import MaterialReactTable, { type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Table Paper Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const NoBoxShadow = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTablePaperProps={{
      elevation: 0,
    }}
  />
);
