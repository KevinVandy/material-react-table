import { Meta } from '@storybook/react';
import MaterialReactTable, { type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Dense Padding Examples',
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
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Zip Code',
    accessorKey: 'zipCode',
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
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.number(),
}));

export const DensePaddingToggleEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const DensePaddingDisabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableDensityToggle={false}
  />
);

export const DefaultToDensePadding = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{
      pagination: { pageSize: 25, pageIndex: 0 },
      density: 'compact',
    }}
  />
);
