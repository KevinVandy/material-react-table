import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import Button from '@mui/material/Button';
import MuiMenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material';
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

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const RowActionsEnabled = () => (
  <MaterialReactTable
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
  <MaterialReactTable
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
  <MaterialReactTable
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
