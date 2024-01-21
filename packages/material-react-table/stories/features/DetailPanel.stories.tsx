import { MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Detail Panel Examples',
};

export default meta;

export const DetailPanelEnabledSemantic = () => (
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

export const DetailPanelEnabledGrid = () => (
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
    layoutMode="grid"
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

export const DetailPanelEnabledGridNoGrow = () => (
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
    layoutMode="grid-no-grow"
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

export const CustomExpandRotation = () => (
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
    muiExpandButtonProps={({ row }) => ({
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    })}
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
    renderDetailPanel={({ row }) =>
      row.original.age > 50 ? (
        <div style={{ display: 'grid' }}>
          <span>City: {row.original.city}</span>
          <span>State: {row.original.state}</span>
          <span>Zip: {row.original.zipCode}</span>
          <span>Phone: {row.original.phone}</span>
        </div>
      ) : undefined
    }
  />
);

export const DetailPanelEnabledConditionalHide = () => (
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
        'No details available'
      )
    }
  />
);

export const DetailPanelSingleExpand = () => {
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
      muiExpandButtonProps={({ row, table }) => ({
        onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      })}
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
};

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

export const DetailPanelExpandAllDisabledGrid = () => (
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
    layoutMode="grid"
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

export const DetailPanelExpandAllDisabledGridNoGrow = () => (
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
    layoutMode="grid-no-grow"
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
