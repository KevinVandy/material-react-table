import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';
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

const columns: TRT_ColumnDef<(typeof data)[0]>[] = [
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

const data = [...Array(10)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const RowActionsEnabled = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActionMenuItems={({ row, closeMenu }) => [
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
    ]}
  />
);

export const RowActionsAndEditingEnabled = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowActions
    enableEditing
    renderRowActionMenuItems={({ row, closeMenu }) => [
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
    ]}
  />
);

export const RowActionsLastColumn = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowActions
    initialState={{ density: 'compact' }}
    positionActionsColumn="last"
    renderRowActionMenuItems={({ row, closeMenu }) => [
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
    ]}
  />
);

export const CustomRowActionButtons = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActions={({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.info('View Profile', row);
          }}
        >
          View
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
        >
          Remove
        </Button>
      </div>
    )}
  />
);

export const CustomRowActionButtonsLastColumn = () => (
  <TailwindCSSReactTable
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
            console.info('View Profile', row);
          }}
        >
          View
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
        >
          Remove
        </Button>
      </div>
    )}
  />
);
