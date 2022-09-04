import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Table Dimensions Examples',
};

export default meta;

const columns: MRT_ColumnDef<typeof data[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(25)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const MaxWidthAndCentered: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTablePaperProps={{
      sx: {
        maxWidth: '800px',
        m: 'auto',
      },
    }}
  />
);

export const maxHeight: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableContainerProps={{
      sx: {
        maxHeight: '500px',
      },
    }}
  />
);

export const minHeight: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data.slice(0, 5)}
    muiTableContainerProps={{
      sx: {
        minHeight: '800px',
      },
    }}
  />
);

export const minHeightParent: Story<MaterialReactTableProps> = () => (
  <div style={{ height: '700px' }}>
    <MaterialReactTable
      columns={columns}
      data={data.slice(0, 5)}
      muiTableContainerProps={({ table }) => ({
        sx: {
          height: `calc(100% - ${table.refs.topToolbarRef.current?.offsetHeight}px - ${table.refs.bottomToolbarRef.current?.offsetHeight}px)`,
        },
      })}
      muiTablePaperProps={{
        sx: {
          height: '100%',
        },
      }}
    />
  </div>
);
