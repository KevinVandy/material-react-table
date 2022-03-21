import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../src';
import faker from '@faker-js/faker';
import { Button, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { TableInstance } from 'react-table';

const meta: Meta = {
  title: 'Prop Playground',
  component: MaterialReactTable,
};

export default meta;

const Template: Story<MaterialReactTableProps> = (
  args: MaterialReactTableProps,
) => <MaterialReactTable {...args} />;

export const Default = Template.bind({});

Default.args = {
  columns: [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
  ],
  data: [...Array(6)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
} as MaterialReactTableProps;

export const MinimumFeatures = Template.bind({});

MinimumFeatures.args = {
  columns: [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
  ],
  data: [...Array(6)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
  manualPagination: true,
  hideToolbarTop: true,
  hideToolbarBottom: true,
  disableSortBy: true,
  disableColumnActions: true,
} as MaterialReactTableProps;

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
      Header: 'Name',
      Footer: 'Name',
      columns: [
        {
          Header: 'First Name',
          Footer: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          Footer: 'Last Name',
          accessor: 'lastName',
        },
      ],
    },
    {
      Header: 'Info',
      Footer: 'Info',
      columns: [
        {
          Header: 'Age',
          Footer: 'Age',
          accessor: 'age',
        },
        {
          Header: 'Address',
          Footer: 'Address',
          accessor: 'address',
        },
        {
          Header: 'City',
          Footer: 'City',
          accessor: 'city',
        },
        {
          Header: 'State',
          Footer: 'State',
          accessor: 'state',
        },
      ],
    },
  ],
  data: maxFeaturesData,
  enableClickToCopy: true,
  enableColumnGrouping: true,
  enableColumnResizing: false,
  enableSelection: true,
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
      tableInstance.selectedFlatRows.map((row) => {
        console.log('deactivating ' + row.original);
      });
    };

    const handleActivate = () => {
      tableInstance.selectedFlatRows.map((row) => {
        console.log('activating ' + row.original);
      });
    };

    const handleContact = () => {
      tableInstance.selectedFlatRows.map((row) => {
        console.log('contact ' + row.original);
      });
    };

    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          color="error"
          disabled={tableInstance.selectedFlatRows.length === 0}
          onClick={handleDeactivate}
          variant="contained"
        >
          Deactivate
        </Button>
        <Button
          color="success"
          disabled={tableInstance.selectedFlatRows.length === 0}
          onClick={handleActivate}
          variant="contained"
        >
          Activate
        </Button>
        <Button
          color="info"
          disabled={tableInstance.selectedFlatRows.length === 0}
          onClick={handleContact}
          variant="contained"
        >
          Contact
        </Button>
      </div>
    );
  },
  positionToolbarAlertBanner: 'bottom',
} as MaterialReactTableProps;
