import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import faker from '@faker-js/faker';
import { Typography } from '@mui/material';

const meta: Meta = {
  title: 'Features/Virtualization',
};

export default meta;

const columns: MRT_ColumnDef[] = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
  },
  {
    header: 'Email Address',
    id: 'email',
  },
  {
    header: 'Address',
    id: 'address',
  },
  {
    header: 'City',
    id: 'city',
  },
  {
    header: 'State',
    id: 'state',
  },
];

const data = [...Array(500)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const VirtualizationDisabledDefault: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination={false}
    enableTableFooter={false}
    renderToolbarCustomActions={() => (
      <Typography>No Row Virtualization, Poor Scroll Performance</Typography>
    )}
  />
);

export const EnableRowVirtualization: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination={false}
    enableRowVirtualization
    enableTableFooter={false}
    renderToolbarCustomActions={() => (
      <Typography>
        Row Virtualization Enabled, Better Scroll Performance
      </Typography>
    )}
  />
);
