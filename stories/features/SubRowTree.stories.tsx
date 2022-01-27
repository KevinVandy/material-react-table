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

export const SubRowTreeEnabledDefault: Story<MaterialReactTableProps> = () => (
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
  />
);

export const SubRowTreeDisableExpandAll: Story<
  MaterialReactTableProps
> = () => (
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
    disableExpandAll
  />
);
