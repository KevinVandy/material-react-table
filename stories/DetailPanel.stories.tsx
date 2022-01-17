import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MaterialReactTable, MaterialReactTableProps } from '../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Feature Examples/Detail Panel Examples',
};

export default meta;

const columns = [
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
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
}));

export const DetailPanelEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    renderDetailPanel={(rowData) => {
      console.log(rowData);
      return (
        <div style={{display: 'grid'}}>
          <span>{rowData.original?.address}</span>
          <span>{rowData.original?.city}</span>
          <span>{rowData.original?.state}</span>
          <span>{rowData.original?.zipCode}</span>
        </div>
      );
    }}
  />
);
