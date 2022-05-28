import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { Button, MenuItem as MuiMenuItem, styled } from '@mui/material';
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
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
  },
  {
    header: 'Address',
    id: 'address',
  },
  {
    header: 'State',
    id: 'state',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
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
    renderRowActionMenuItems={({ row, closeMenu }) => [
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
    enableEditing
    renderRowActionMenuItems={({ row, closeMenu }) => [
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

export const RowActionsLastColumn: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowActions
    positionActionsColumn="last"
    renderRowActionMenuItems={({ row, closeMenu }) => [
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

export const CustomRowActionButtons: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActions={({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('View Profile', row);
          }}
        >
          View
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            console.log('Remove', row);
          }}
        >
          Remove
        </Button>
      </div>
    )}
  />
);

export const CustomRowActionButtonsLastColumn: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowActions
    positionActionsColumn="last"
    renderRowActions={({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('View Profile', row);
          }}
        >
          View
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            console.log('Remove', row);
          }}
        >
          Remove
        </Button>
      </div>
    )}
  />
);
