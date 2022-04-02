import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../src';
import faker from '@faker-js/faker';
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
      id: 'firstName',
    },
    {
      header: 'Last Name',
      id: 'lastName',
    },
    {
      header: 'Age',
      id: 'age',
    },
    {
      header: 'Address',
      id: 'address',
    },
  ],
  data: [...Array(6)].map((_) => ({
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
      id: 'firstName',
    },
    {
      header: 'Last Name',
      id: 'lastName',
    },
    {
      header: 'Age',
      id: 'age',
    },
    {
      header: 'Address',
      id: 'address',
    },
  ],
  data: [...Array(6)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
  enableColumnActions: false,
  enablePagination: false,
  enableSorting: false,
  enableColumnFilters: false,
  hideToolbarBottom: true,
  hideToolbarTop: true,
  muiTableBodyRowProps: { hover: false },
} as MaterialReactTableProps<Row>;

const maxFeaturesData = [...Array(250)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(40) + 10,
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  subRows: [...Array(faker.datatype.number(3))].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40) + 10,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    subRows: [...Array(faker.datatype.number(3))].map((_) => ({
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
      id: 'name',
      columns: [
        {
          header: 'First Name',
          footer: 'First Name',
          id: 'firstName',
        },
        {
          header: 'Last Name',
          footer: 'Last Name',
          id: 'lastName',
        },
      ],
    },
    {
      header: 'Info',
      footer: 'Info',
      id: 'info',
      columns: [
        {
          header: 'Age',
          footer: 'Age',
          id: 'age',
        },
        {
          header: 'Address',
          footer: 'Address',
          id: 'address',
        },
        {
          header: 'City',
          footer: 'City',
          id: 'city',
        },
        {
          header: 'State',
          footer: 'State',
          id: 'state',
        },
      ],
    },
  ],
  data: maxFeaturesData,
  enableClickToCopy: true,
  enableGrouping: true,
  enableColumnResizing: false,
  enableRowSelection: true,
  enableRowActions: true,
  enableRowNumbers: true,
  enableRowEditing: true,
  renderRowActionMenuItems: (row, _tableInstance, closeMenu) => [
    <MenuItem
      key={1}
      onClick={() => {
        console.log('View Profile', row);
        closeMenu();
      }}
    >
      <AccountCircleIcon /> View Profile
    </MenuItem>,
    <MenuItem
      key={2}
      onClick={() => {
        console.log('Remove', row);
        closeMenu();
      }}
    >
      <DeleteIcon /> Remove
    </MenuItem>,
    <MenuItem
      key={3}
      onClick={() => {
        console.log('Share', row);
        closeMenu();
      }}
    >
      <ShareIcon /> Share
    </MenuItem>,
  ],
  renderToolbarCustomActions: (tableInstance) => {
    const handleDeactivate = () => {
      tableInstance.getSelectedRowModel().rows.map((row) => {
        console.log('deactivating ' + row.original);
      });
    };

    const handleActivate = () => {
      tableInstance.getSelectedRowModel().rows.map((row) => {
        console.log('activating ' + row.original);
      });
    };

    const handleContact = () => {
      tableInstance.getSelectedRowModel().rows.map((row) => {
        console.log('contact ' + row.original);
      });
    };

    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          color="error"
          disabled={tableInstance.getSelectedRowModel().rows.length === 0}
          onClick={handleDeactivate}
          variant="contained"
        >
          Deactivate
        </Button>
        <Button
          color="success"
          disabled={tableInstance.getSelectedRowModel().rows.length === 0}
          onClick={handleActivate}
          variant="contained"
        >
          Activate
        </Button>
        <Button
          color="info"
          disabled={tableInstance.getSelectedRowModel().rows.length === 0}
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
