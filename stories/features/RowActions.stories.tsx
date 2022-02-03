import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { MenuItem as MuiMenuItem, styled } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

const MenuItem = styled(MuiMenuItem)({
  display: 'flex',
  gap: '0.75rem',
});

const meta: Meta = {
  title: 'Features/Row Actions Examples',
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber' as const,
  },
];

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const RowActionsEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActionMenuItems={(row, _tableInstance, closeMenu) => [
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
    ]}
  />
);

export const RowActionsAndEditingEnabled: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowActions
    enableRowEditing
    renderRowActionMenuItems={(row, _tableInstance, closeMenu) => [
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
    ]}
  />
);
