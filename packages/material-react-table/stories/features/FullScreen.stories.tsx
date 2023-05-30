import { useState } from 'react';
import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Full Screen Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'Employee',
    id: 'employee',
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
    id: 'jobInfo',
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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  jobTitle: faker.person.jobTitle(),
  salary: +faker.finance.amount(0, 150000, 0) + 20000,
  startDate: faker.date.past(8).toLocaleDateString(),
  signatureCatchPhrase: faker.company.catchPhrase(),
  avatar: faker.image.avatar(),
}));

export const FullScreenToggleEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const DisableFullScreenToggle = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableFullScreenToggle={false}
  />
);

export const DefaultFullScreenOn = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ isFullScreen: true }}
  />
);

export const ControlledFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      onIsFullScreenChange={setIsFullScreen}
      state={{ isFullScreen }}
      muiTableBodyCellProps={({ cell }) => ({
        title: cell.getValue<string>(),
      })}
    />
  );
};
