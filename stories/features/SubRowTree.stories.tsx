import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Sub Row Tree Examples',
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
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
  },
];

export const SubRowTree: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={[...Array(5)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.datatype.number(80),
      address: faker.address.streetAddress(),
      phoneNumber: faker.phone.phoneNumber(),
      subRows: [...Array(faker.datatype.number(4))].map((_) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(80),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        subRows: [...Array(3)].map((_) => ({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          age: faker.datatype.number(80),
          address: faker.address.streetAddress(),
          phoneNumber: faker.phone.phoneNumber(),
          subRows: [...Array(2)].map((_) => ({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.datatype.number(80),
            address: faker.address.streetAddress(),
            phoneNumber: faker.phone.phoneNumber(),
          })),
        })),
      })),
    }))}
    enablePagination={false}
  />
);

export const SubRowTreeExpandAll: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={[...Array(5)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.datatype.number(80),
      address: faker.address.streetAddress(),
      phoneNumber: faker.phone.phoneNumber(),
      subRows: [...Array(faker.datatype.number(4))].map((_) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(80),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        subRows: [...Array(3)].map((_) => ({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          age: faker.datatype.number(80),
          address: faker.address.streetAddress(),
          phoneNumber: faker.phone.phoneNumber(),
          subRows: [...Array(2)].map((_) => ({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.datatype.number(80),
            address: faker.address.streetAddress(),
            phoneNumber: faker.phone.phoneNumber(),
          })),
        })),
      })),
    }))}
    enableExpandAll
    enablePagination={false}
  />
);
