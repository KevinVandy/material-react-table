import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  type MRT_ColumnDef,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Toolbar Examples',
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
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const data = [...Array(5)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
}));

export const ToolbarEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} enableRowSelection />
);

export const TopToolbarHidden = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableTopToolbar={false}
  />
);

export const BottomToolbarHidden = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableBottomToolbar={false}
    enableRowSelection
  />
);

export const NoToolbars = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableBottomToolbar={false}
    enableRowSelection
    enableTopToolbar={false}
  />
);

export const HideToolbarInternalActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableToolbarInternalActions={false}
  />
);

export const CustomToolbarInternalActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    enableRowSelection
    renderToolbarInternalActions={({ table }) => {
      return (
        <>
          <MRT_ToggleFullScreenButton table={table} />
        </>
      );
    }}
  />
);

export const TableTitle = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderTopToolbarCustomActions={() => {
      return <Typography variant="h4">Table Title</Typography>;
    }}
  />
);

export const CustomTopToolbarActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderTopToolbarCustomActions={() => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };

      return (
        <div>
          <Tooltip title="Create New User">
            <IconButton onClick={handleCreateNewUser}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const CustomBottomToolbarActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderBottomToolbarCustomActions={() => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };

      return (
        <div>
          <Tooltip title="Create New User">
            <IconButton onClick={handleCreateNewUser}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const CustomTopToolbarSelectionActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderTopToolbarCustomActions={({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.original.firstName);
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.original.firstName);
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.original.firstName);
        });
      };

      return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            color="error"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleDeactivate}
            variant="contained"
          >
            Deactivate
          </Button>
          <Button
            color="success"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleActivate}
            variant="contained"
          >
            Activate
          </Button>
          <Button
            color="info"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleContact}
            variant="contained"
          >
            Contact
          </Button>
        </div>
      );
    }}
  />
);

export const CustomBottomToolbarSelectionActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderBottomToolbarCustomActions={({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.original.firstName);
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.original.firstName);
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.original.firstName);
        });
      };

      return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            color="error"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleDeactivate}
            variant="contained"
          >
            Deactivate
          </Button>
          <Button
            color="success"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleActivate}
            variant="contained"
          >
            Activate
          </Button>
          <Button
            color="info"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleContact}
            variant="contained"
          >
            Contact
          </Button>
        </div>
      );
    }}
  />
);

export const ToolbarAlertBannerBottom = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="bottom"
    renderTopToolbarCustomActions={({ table }) => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };
      const handleRemoveUsers = () => {
        confirm('Are you sure you want to remove the selected users?');
      };

      return (
        <div>
          <Tooltip title="Create New User">
            <IconButton onClick={handleCreateNewUser}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove Users">
            <span>
              <IconButton
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleRemoveUsers}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const ToolbarAlertBannerBottomWithActionsAlsoBottom = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="bottom"
    renderBottomToolbarCustomActions={({ table }) => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };
      const handleRemoveUsers = () => {
        confirm('Are you sure you want to remove the selected users?');
      };

      return (
        <div>
          <Tooltip title="Create New User">
            <IconButton onClick={handleCreateNewUser}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove Users">
            <span>
              <IconButton
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleRemoveUsers}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const renderCustomTopToolbar = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    renderTopToolbar={() => <Box sx={{ p: '2rem' }}>Custom Top Toolbar</Box>}
  />
);

export const renderCustomBottomToolbar = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    renderBottomToolbar={() => (
      <Box sx={{ p: '2rem' }}>Custom Bottom Toolbar</Box>
    )}
  />
);
