import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import { faker } from '@faker-js/faker';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

const meta: Meta = {
  title: 'Features/Toolbar Examples',
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
    header: 'Age',
    id: 'age',
  },
  {
    header: 'Address',
    id: 'address',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
  },
];

const data = [...Array(5)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.number(),
}));

export const ToolbarEnabledDefault: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableRowSelection />
);

export const TopToolbarHidden: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableToolbarTop={false}
  />
);

export const BottomToolbarHidden: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableToolbarBottom={false}
  />
);

export const NoToolbars: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableToolbarTop={false}
    enableToolbarBottom={false}
  />
);

export const HideToolbarInternalActions: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableToolbarInternalActions={false}
  />
);

export const CustomToolbarInternalActions: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableGrouping
    renderToolbarInternalActions={({
      instance,
      MRT_FullScreenToggleButton,
    }) => {
      return (
        <>
          <MRT_FullScreenToggleButton instance={instance} />
        </>
      );
    }}
  />
);

export const TableTitle: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderToolbarTopCustomActions={(instance) => {
      return <Typography variant="h4">Table Title</Typography>;
    }}
  />
);

export const CustomToolbarTopActions: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderToolbarTopCustomActions={(instance) => {
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

export const CustomToolbarBottomActions: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderToolbarBottomCustomActions={(instance) => {
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

export const CustomToolbarTopSelectionActions: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderToolbarTopCustomActions={({ instance }) => {
      const handleDeactivate = () => {
        instance.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.original.firstName);
        });
      };

      const handleActivate = () => {
        instance.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.original.firstName);
        });
      };

      const handleContact = () => {
        instance.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.original.firstName);
        });
      };

      return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            color="error"
            disabled={instance.getSelectedRowModel().flatRows.length === 0}
            onClick={handleDeactivate}
            variant="contained"
          >
            Deactivate
          </Button>
          <Button
            color="success"
            disabled={instance.getSelectedRowModel().flatRows.length === 0}
            onClick={handleActivate}
            variant="contained"
          >
            Activate
          </Button>
          <Button
            color="info"
            disabled={instance.getSelectedRowModel().flatRows.length === 0}
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

export const CustomToolbarBottomSelectionActions: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderToolbarBottomCustomActions={({ instance }) => {
      const handleDeactivate = () => {
        instance.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.original.firstName);
        });
      };

      const handleActivate = () => {
        instance.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.original.firstName);
        });
      };

      const handleContact = () => {
        instance.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.original.firstName);
        });
      };

      return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            color="error"
            disabled={instance.getSelectedRowModel().flatRows.length === 0}
            onClick={handleDeactivate}
            variant="contained"
          >
            Deactivate
          </Button>
          <Button
            color="success"
            disabled={instance.getSelectedRowModel().flatRows.length === 0}
            onClick={handleActivate}
            variant="contained"
          >
            Activate
          </Button>
          <Button
            color="info"
            disabled={instance.getSelectedRowModel().flatRows.length === 0}
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

export const ToolbarAlertBannerBottom: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="bottom"
    renderToolbarTopCustomActions={({ instance }) => {
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
                disabled={instance.getSelectedRowModel().flatRows.length === 0}
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

export const ToolbarAlertBannerBottomWithActionsAlsoBottom: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="bottom"
    renderToolbarBottomCustomActions={({ instance }) => {
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
                disabled={instance.getSelectedRowModel().flatRows.length === 0}
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
