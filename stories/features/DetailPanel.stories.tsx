import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Detail Panel Examples',
};

export default meta;

export const DetailPanelEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Address',
        accessor: 'address',
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

export const DetailPanelExpandAllEnabled: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Address',
        accessor: 'address',
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
    enableExpandAll
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
