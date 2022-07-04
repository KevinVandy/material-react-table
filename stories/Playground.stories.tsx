import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../src';
import { faker } from '@faker-js/faker';
import { Button, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

const meta: Meta = {
  title: 'Prop Playground',
  component: MaterialReactTable,
};

export default meta;

const Template: Story<MaterialReactTableProps> = (
  args: MaterialReactTableProps,
) => <MaterialReactTable {...args} />;

export const Default = Template.bind({});

interface Row {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
}

Default.args = {
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
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
  ],
  data: [...Array(6)].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
} as MaterialReactTableProps<Row>;

export const MinimumFeatures = Template.bind({});

MinimumFeatures.args = {
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
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
  ],
  data: [...Array(6)].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
  enableColumnActions: false,
  enableColumnFilters: false,
  enablePagination: false,
  enableSorting: false,
  enableStickyHeader: false,
  enableToolbarBottom: false,
  enableToolbarTop: false,
  muiTableBodyRowProps: { hover: false },
} as MaterialReactTableProps<Row>;

const maxFeaturesData = [...Array(250)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(40) + 10,
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  subRows: [...Array(faker.datatype.number(3))].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40) + 10,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    subRows: [...Array(faker.datatype.number(3))].map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.datatype.number(40) + 10,
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
    })),
  })),
}));

export const MaximumFeatures = Template.bind({});

MaximumFeatures.args = {
  columns: [
    {
      header: 'Name',
      footer: 'Name',
      accessorKey: 'name',
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
      footer: 'Info',
      accessorKey: 'info',
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
        {
          header: 'City',
          footer: 'City',
          accessorKey: 'city',
        },
        {
          header: 'State',
          footer: 'State',
          accessorKey: 'state',
        },
      ],
    },
  ],
  data: maxFeaturesData,
  enableClickToCopy: true,
  enableColumnOrdering: true,
  enableColumnResizing: true,
  enableEditing: true,
  enableExpanding: true,
  enableGrouping: true,
  enablePinning: true,
  enableRowActions: true,
  enableRowNumbers: true,
  enableRowSelection: true,
  renderRowActionMenuItems: (row, _tableInstance, closeMenu) => [
    <MenuItem
      key={1}
      onClick={() => {
        console.info('View Profile', row);
        closeMenu();
      }}
    >
      <AccountCircleIcon /> View Profile
    </MenuItem>,
    <MenuItem
      key={2}
      onClick={() => {
        console.info('Remove', row);
        closeMenu();
      }}
    >
      <DeleteIcon /> Remove
    </MenuItem>,
    <MenuItem
      key={3}
      onClick={() => {
        console.info('Share', row);
        closeMenu();
      }}
    >
      <ShareIcon /> Share
    </MenuItem>,
  ],
  renderToolbarTopCustomActions: ({ table }) => {
    const handleDeactivate = () => {
      table.getSelectedRowModel().rows.forEach((row) => {
        console.info('deactivating ' + row.original);
      });
    };

    const handleActivate = () => {
      table.getSelectedRowModel().rows.forEach((row) => {
        console.info('activating ' + row.original);
      });
    };

    const handleContact = () => {
      table.getSelectedRowModel().rows.forEach((row) => {
        console.info('contact ' + row.original);
      });
    };

    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          color="error"
          disabled={table.getSelectedRowModel().rows.length === 0}
          onClick={handleDeactivate}
          variant="contained"
        >
          Deactivate
        </Button>
        <Button
          color="success"
          disabled={table.getSelectedRowModel().rows.length === 0}
          onClick={handleActivate}
          variant="contained"
        >
          Activate
        </Button>
        <Button
          color="info"
          disabled={table.getSelectedRowModel().rows.length === 0}
          onClick={handleContact}
          variant="contained"
        >
          Contact
        </Button>
      </div>
    );
  },
  positionToolbarAlertBanner: 'bottom',
} as MaterialReactTableProps<typeof maxFeaturesData[0]>;
