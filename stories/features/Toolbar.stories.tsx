import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Toolbar Examples',
  parameters: {
    status: {
      type: 'alpha',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Age',
    accessor: 'age' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber' as const,
  },
];

const data = [...Array(5)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ToolbarEnabledDefault: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} title="My Table" />
);

export const TopToolbarHidden: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} hideToolbarTop />
);

export const BottomToolbarHidden: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} hideToolbarBottom />
);

export const NoToolbars: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} hideToolbarTop hideToolbarBottom />
);

export const hideToolbarActions: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} hideToolbarActions />
);

export const toolbarActionsOnBottom: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    title="My People Table"
    positionToolbarActions="bottom"
  />
);

export const ToolbarWithStyledTitle: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    title="My People Table"
    muiTableTitleProps={{ variant: 'h4' }}
  />
);
