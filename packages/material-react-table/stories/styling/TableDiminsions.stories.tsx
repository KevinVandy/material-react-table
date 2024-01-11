import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Table Dimensions Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const data = [...Array(25)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const MaxWidthAndCentered = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTablePaperProps={{
      sx: {
        m: 'auto',
        maxWidth: '800px',
      },
    }}
  />
);

export const maxHeight = () => (
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

export const minHeight = () => (
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

export const minHeightParent = () => (
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

export const ContainerHeight = () => (
  <div style={{ height: '300px' }}>
    <MaterialReactTable
      columns={columns}
      data={data}
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
