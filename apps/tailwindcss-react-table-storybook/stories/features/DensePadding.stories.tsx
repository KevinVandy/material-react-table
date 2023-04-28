import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Dense Padding Examples',
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
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.number(),
}));

export const DensePaddingToggleEnabledDefault = () => (
  <TailwindCSSReactTable columns={columns} data={data} />
);

export const DensePaddingDisabled = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableDensityToggle={false}
  />
);

export const DefaultToDensePadding = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    initialState={{
      pagination: { pageSize: 25, pageIndex: 0 },
      density: 'compact',
    }}
  />
);
