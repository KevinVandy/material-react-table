import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MuiMenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

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

const data = [...Array(10)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const RowActionsEnabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActionMenuItems={({ closeMenu, row }) => [
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

export const RowActionsEnabledConditionally = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions={enabled}
      renderRowActionMenuItems={({ closeMenu, row }) => [
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
      renderTopToolbarCustomActions={() => (
        <Button onClick={() => setEnabled(!enabled)}>Toggle Row Actions</Button>
      )}
    />
  );
};

export const RowActionsAndEditingEnabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableEditing
    enableRowActions
    renderRowActionMenuItems={({ closeMenu, row }) => [
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

export const RowActionsAndEditingCellEnabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    editDisplayMode="cell"
    enableEditing
    enableRowActions
    renderRowActionMenuItems={({ closeMenu, row }) => [
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
    renderRowActionMenuItems={({ closeMenu, row }) => [
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
          color="primary"
          onClick={() => {
            console.info('View Profile', row);
          }}
          variant="contained"
        >
          View
        </Button>
        <Button
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
          variant="contained"
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
          color="primary"
          onClick={() => {
            console.info('View Profile', row);
          }}
          variant="contained"
        >
          View
        </Button>
        <Button
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
          variant="contained"
        >
          Remove
        </Button>
      </div>
    )}
  />
);

export const RowActionsCompleteOverride = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-actions': {
        Cell: ({ row, table }) => (
          <>
            <Button variant="contained">Custom Row Action</Button>
            <IconButton onClick={() => table.setEditingRow(row)}>
              <Edit />
            </IconButton>
          </>
        ),
        size: 300,
      },
    }}
    editDisplayMode="row"
    enableEditing
    enableRowActions
  />
);
