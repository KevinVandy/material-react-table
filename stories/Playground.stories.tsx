import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MaterialReactTable, MaterialReactTableProps } from '../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Prop Playground',
  component: MaterialReactTable,
};

export default meta;

const Template: Story<MaterialReactTableProps> = (args) => (
  <MaterialReactTable {...args} />
);

export const Default = Template.bind({});

Default.args = {
  columns: [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
  ],
  data: [...Array(6)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
};

export const MinimumFeatures = Template.bind({});

MinimumFeatures.args = {
  columns: [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
  ],
  data: [...Array(6)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
  enablePagination: false,
  enableSorting: false,
  showFooter: false,
  showHead: false,
};

const maxFeaturesData = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const MaximumFeatures = Template.bind({});

MaximumFeatures.args = {
  columns: [
    {
      Header: 'Name',
      Footer: 'Footer',
      columns: [
        {
          Header: 'First Name',
          Footer: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          Footer: 'Last Name',
          accessor: 'lastName',
        },
      ],
    },
    {
      Header: 'Info',
      Footer: 'Info',
      columns: [
        {
          Header: 'Age',
          Footer: 'Age',
          accessor: 'age',
        },
        {
          Header: 'Address',
          Footer: 'Address',
          accessor: 'address',
        },
      ],
    },
  ],
  data: maxFeaturesData,
  enableColumnHiding: true,
  enableExpandAll: true,
  enableFiltering: true,
  enableSearch: true,
  enableSelectAll: true,
  enableSelection: true,
  showToolbar: true,
  title: 'Kitchen Sink',
};
