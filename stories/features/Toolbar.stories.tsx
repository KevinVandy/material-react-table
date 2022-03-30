import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

const meta: Meta = {
  title: 'Features/Toolbar Examples',
  parameters: {
    status: {
      type: 'beta',
    },
  },
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

const data = [...Array(5)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ToolbarEnabledDefault: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const TopToolbarHidden: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} hideToolbarTop />
);

export const BottomToolbarHidden: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} hideToolbarBottom />
);

export const NoToolbars: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    hideToolbarTop
    hideToolbarBottom
  />
);

export const HideToolbarInternalActions: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    hideToolbarInternalActions
  />
);

export const ToolbarInternalActionsOnBottom: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    positionToolbarActions="bottom"
  />
);

export const CustomToolbarInternalActions: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    renderToolbarInternalActions={(
      tableInstance,
      { MRT_FullScreenToggleButton },
    ) => {
      return (
        <>
          <MRT_FullScreenToggleButton />
        </>
      );
    }}
  />
);

export const TableTitle: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    renderToolbarCustomActions={(tableInstance) => {
      return <Typography variant="h4">Table Title</Typography>;
    }}
  />
);

export const CustomToolbarActions: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    renderToolbarCustomActions={(tableInstance) => {
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

export const CustomToolbarSelectionActions: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableSelection
    renderToolbarCustomActions={(tableInstance) => {
      const handleDeactivate = () => {
        tableInstance.selectedFlatRows.map((row) => {
          alert('deactivating ' + row.original.firstName);
        });
      };

      const handleActivate = () => {
        tableInstance.selectedFlatRows.map((row) => {
          alert('activating ' + row.original.firstName);
        });
      };

      const handleContact = () => {
        tableInstance.selectedFlatRows.map((row) => {
          alert('contact ' + row.original.firstName);
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
    }}
  />
);

export const ToolbarAlertBannerBottom: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableSelection
    positionToolbarAlertBanner="bottom"
    renderToolbarCustomActions={(tableInstance) => {
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
                disabled={tableInstance.selectedFlatRows.length === 0}
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
