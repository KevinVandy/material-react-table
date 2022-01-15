import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReactTableMui, ReactTableMuiProps } from '../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'ReactTableMui',
  component: ReactTableMui,
};

export default meta;

const Template: Story<ReactTableMuiProps> = (args) => (
  <ReactTableMui {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
  columns: [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
  ],
  data: [...Array(5)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })),
};

// export const HeaderGroups = Template.bind({});

// HeaderGroups.args = {
//   columns: [
//     {
//       Header: 'Name',
//       columns: [
//         {
//           Header: 'First Name',
//           accessor: 'firstName',
//         },
//         {
//           Header: 'Last Name',
//           accessor: 'lastName',
//         },
//       ],
//     },
//     {
//       Header: 'Info',
//       columns: [
//         {
//           Header: 'Age',
//           accessor: 'age',
//         },
//         {
//           Header: 'Address',
//           accessor: 'address',
//         },
//       ],
//     },
//   ],
//   data: [...Array(12)].map((_) => ({
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     age: faker.datatype.number(100),
//     address: faker.address.streetAddress(),
//   })),
// };

// export const FooterGroups = Template.bind({});

// FooterGroups.args = {
//   columns: [
//     {
//       Header: 'Name',
//       Footer: 'Name',
//       columns: [
//         {
//           Header: 'First Name',
//           Footer: 'First Name',
//           accessor: 'firstName',
//         },
//         {
//           Header: 'Last Name',
//           Footer: 'Last Name',
//           accessor: 'lastName',
//         },
//       ],
//     },
//     {
//       Header: 'Info',
//       Footer: 'Info',
//       columns: [
//         {
//           Header: 'Age',
//           Footer: 'Age',
//           accessor: 'age',
//         },
//         {
//           Header: 'Address',
//           Footer: 'Address',
//           accessor: 'address',
//         },
//       ],
//     },
//   ],
//   data: [...Array(12)].map((_) => ({
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     age: faker.datatype.number(100),
//     address: faker.address.streetAddress(),
//   })),
// };
