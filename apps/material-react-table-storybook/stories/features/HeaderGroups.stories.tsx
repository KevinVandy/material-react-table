import React from 'react';
 import { Meta } from '@storybook/react';
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Header Groups Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'Name',
    id: 'name',
    columns: [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },

      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
    ],
  },
  {
    header: 'Info',
    id: 'info',
    columns: [
      {
        header: 'Age',
        accessorKey: 'age',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
    ],
  },
];

const data = [...Array(55)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const HeaderGroups = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const HeaderGroupsWithStickyHeader = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableStickyHeader
    initialState={{ pagination: { pageIndex: 0, pageSize: 25 } }}
  />
);

export const HeaderAndFooterGroups = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'Name',
        id: 'name',
        footer: 'Name',
        columns: [
          {
            header: 'First Name',
            footer: 'First Name',
            accessorKey: 'firstName',
          },
          {
            header: 'Last Name',
            footer: 'Last Name',
            accessorKey: 'lastName',
          },
        ],
      },
      {
        header: 'Info',
        id: 'info',
        footer: 'Info',
        columns: [
          {
            header: 'Age',
            footer: 'Age',
            accessorKey: 'age',
          },
          {
            header: 'Address',
            footer: 'Address',
            accessorKey: 'address',
          },
        ],
      },
    ]}
    data={data}
    enablePinning
  />
);

export const HeaderGroupsWithColumnOrdering = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
);

export const HeaderGroupsWithColumnPinning = () => (
  <MaterialReactTable columns={columns} data={data} enablePinning />
);

export const HeaderGroupsWithColumResizing = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnResizing />
);

export const MixedHeaderGroups = () => {
  return (
    <MaterialReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        {
          id: 'grouped',
          header: 'Grouped',
          columns: [
            {
              accessorKey: 'address',
              header: 'Address',
            },
          ],
        },
        {
          accessorKey: 'city',
          header: 'City',
        },
        {
          accessorKey: 'state',
          header: 'State',
        },
      ]}
      data={data}
    />
  );
};

export const DeepMixedHeaderGroups = () => {
  return (
    <MaterialReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          id: 'grouped',
          header: 'Grouped',
          columns: [
            {
              header: 'Location',
              id: 'location',
              columns: [
                {
                  accessorKey: 'address',
                  header: 'Address',
                },
                {
                  accessorKey: 'city',
                  header: 'City',
                },
                {
                  accessorKey: 'state',
                  header: 'State',
                },
              ],
            },
          ],
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
      ]}
      data={data}
    />
  );
};
