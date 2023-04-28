import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
  TRT_FullScreenToggleButton,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

const meta: Meta = {
  title: 'Features/Toolbar Examples',
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
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(5)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.number(),
}));

export const ToolbarEnabledDefault = () => (
  <TailwindCSSReactTable columns={columns} data={data} enableRowSelection />
);

export const TopToolbarHidden = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableTopToolbar={false}
  />
);

export const BottomToolbarHidden = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableBottomToolbar={false}
  />
);

export const NoToolbars = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableTopToolbar={false}
    enableBottomToolbar={false}
  />
);

export const HideToolbarInternalActions = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableToolbarInternalActions={false}
  />
);

export const CustomToolbarInternalActions = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableGrouping
    renderToolbarInternalActions={({ table }) => {
      return (
        <>
          <TRT_FullScreenToggleButton table={table} />
        </>
      );
    }}
  />
);

export const TableTitle = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderTopToolbarCustomActions={() => {
      return <Typography variant="h4">Table Title</Typography>;
    }}
  />
);

export const CustomTopToolbarActions = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderTopToolbarCustomActions={() => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };

      return (
        <div>
          <Tooltip arrow title="Create New User">
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
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderBottomToolbarCustomActions={() => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };

      return (
        <div>
          <Tooltip arrow title="Create New User">
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
  <TailwindCSSReactTable
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
  <TailwindCSSReactTable
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
  <TailwindCSSReactTable
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
          <Tooltip arrow title="Create New User">
            <IconButton onClick={handleCreateNewUser}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Remove Users">
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
  <TailwindCSSReactTable
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
          <Tooltip arrow title="Create New User">
            <IconButton onClick={handleCreateNewUser}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Remove Users">
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
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    renderTopToolbar={() => <Box sx={{ p: '2rem' }}>Custom Top Toolbar</Box>}
  />
);

export const renderCustomBottomToolbar = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    renderBottomToolbar={() => (
      <Box sx={{ p: '2rem' }}>Custom Bottom Toolbar</Box>
    )}
  />
);
