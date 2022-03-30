import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Detail Panel Examples',
  parameters: {
    status: {
      type: 'beta',
    },
  },
};

export default meta;

export const DetailPanelEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
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
    ]}
    data={[...Array(5)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      phone: faker.phone.phoneNumber(),
    }))}
    enableGrouping
    renderDetailPanel={(rowData) => (
      <div style={{ display: 'grid' }}>
        <span>City: {rowData.original.city}</span>
        <span>State: {rowData.original.state}</span>
        <span>Zip: {rowData.original.zipCode}</span>
        <span>Phone: {rowData.original.phone}</span>
      </div>
    )}
  />
);

export const DetailPanelExpandAllDisabled: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
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
    ]}
    data={[...Array(5)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      phone: faker.phone.phoneNumber(),
    }))}
    disableExpandAll
    renderDetailPanel={(rowData) => (
      <div style={{ display: 'grid' }}>
        <span>City: {rowData.original.city}</span>
        <span>State: {rowData.original.state}</span>
        <span>Zip: {rowData.original.zipCode}</span>
        <span>Phone: {rowData.original.phone}</span>
      </div>
    )}
  />
);
