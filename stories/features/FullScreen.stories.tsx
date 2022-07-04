import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Full Screen Examples',
};

export default meta;

const columns = [
  {
    header: 'Employee',
    accessorKey: 'employee',
    columns: [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
    ],
  },
  {
    header: 'Job Info',
    accessorKey: 'jobInfo',
    columns: [
      {
        header: 'Job Title',
        accessorKey: 'jobTitle',
      },
      {
        header: 'Salary',
        accessorKey: 'salary',
      },
      {
        header: 'Start Date',
        accessorKey: 'startDate',
      },
    ],
  },
];

const data = [...Array(128)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  jobTitle: faker.name.jobTitle(),
  salary: +faker.finance.amount(0, 150000, 0) + 20000,
  startDate: faker.date.past(8).toLocaleDateString(),
  signatureCatchPhrase: faker.company.catchPhrase(),
  avatar: faker.image.avatar(),
}));

export const FullScreenToggleEnabledDefault: Story<
  MaterialReactTableProps
> = () => <MaterialReactTable columns={columns} data={data} />;

export const DisableFullScreenToggle: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableFullScreenToggle={false}
  />
);

export const DefaultFullScreenOn: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ isFullScreen: true }}
  />
);
