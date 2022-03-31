import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnInterface,
} from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Action Examples',
  parameters: {
    status: {
      type: 'stable',
    },
  },
};

export default meta;

interface Row {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
}

const columns: MRT_ColumnInterface<Row>[] = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
  },
  {
    header: 'Address',
    id: 'address',
  },
  {
    header: 'State',
    id: 'state',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
  },
];

const data: Row[] = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ColumnActionsEnabledDefault: Story<
  MaterialReactTableProps
> = () => <MaterialReactTable columns={columns} data={data} />;

export const ColumnActionsDisabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
  />
);
