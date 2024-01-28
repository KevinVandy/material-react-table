import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Cell Action Examples',
};

export default meta;

interface Row {
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  state: string;
}

const columns: MRT_ColumnDef<Row>[] = [
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

const data: Row[] = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const CellActionsDisabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const CellActionsContextMenu = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableCellActions
    renderCellActionMenuItems={() => [
      <MenuItem key={1}>Item 1</MenuItem>,
      <MenuItem key={2}>Item 2</MenuItem>,
    ]}
  />
);

export const CellActionsHover = () => (
  <MaterialReactTable
    cellActionTrigger="hover"
    columns={columns}
    data={data}
    enableCellActions
    renderCellActions={() => <Box>Hello</Box>}
  />
);

export const CellActionsClick = () => (
  <MaterialReactTable
    cellActionTrigger="click"
    columns={columns}
    data={data}
    enableCellActions
    renderCellActions={() => <Box>Hello</Box>}
  />
);

export const CellActionsRightClick = () => (
  <MaterialReactTable
    cellActionTrigger="right-click"
    columns={columns}
    data={data}
    enableCellActions
    renderCellActions={() => <Box>Hello</Box>}
  />
);