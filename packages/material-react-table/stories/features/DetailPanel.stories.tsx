import { MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Detail Panel Examples',
};

export default meta;

export const DetailPanelEnabled = () => (
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
        accessorKey: 'address',
        header: 'Address',
      },
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);

export const DetailPanelEnabledConditional = () => (
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
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
    ]}
    data={[...Array(10)].map(() => ({
      address: faker.location.streetAddress(),
      age: faker.number.int(100) + 5,
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    muiExpandButtonProps={({ row }) => ({
      sx: {
        display: row.original.age > 50 ? 'flex' : 'none',
      },
    })}
    renderDetailPanel={({ row }) =>
      row.original.age > 50 ? (
        <div style={{ display: 'grid' }}>
          <span>City: {row.original.city}</span>
          <span>State: {row.original.state}</span>
          <span>Zip: {row.original.zipCode}</span>
          <span>Phone: {row.original.phone}</span>
        </div>
      ) : (
        'Not Enabled'
      )
    }
  />
);

export const DetailPanelExpandColumnLast = () => (
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
        accessorKey: 'address',
        header: 'Address',
      },
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    displayColumnDefOptions={{
      'mrt-row-expand': {
        muiTableBodyCellProps: {
          align: 'right',
        },
        muiTableHeadCellProps: {
          align: 'right',
        },
      },
    }}
    positionExpandColumn="last"
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);

export const DetailPanelExpandedByDefault = () => (
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
        accessorKey: 'address',
        header: 'Address',
      },
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    initialState={{ expanded: true }}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);

export const DetailPanelExpandAllDisabled = () => (
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
        accessorKey: 'address',
        header: 'Address',
      },
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    }))}
    enableExpandAll={false}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);
