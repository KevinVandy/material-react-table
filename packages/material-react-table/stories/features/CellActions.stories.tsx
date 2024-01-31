import Email from '@mui/icons-material/Email';
import PersonOffOutlined from '@mui/icons-material/PersonOffOutlined';
import Divider from '@mui/material/Divider';
import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { MRT_ActionMenuItem } from '../../src/components/menus/MRT_ActionMenuItem';
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

export const CellActionsEnabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableCellActions
    enableClickToCopy="context-menu"
  />
);

export const CellActionsEnabledConditionally = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableCellActions={(cell) => cell.row.index % 2 === 0}
    enableClickToCopy="context-menu"
  />
);

export const CellActionsEnabledCustom = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableCellActions
    renderCellActionMenuItems={({ closeMenu, table }) => [
      <MRT_ActionMenuItem
        icon={<Email />}
        key={1}
        label="Item 1"
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        icon={<PersonOffOutlined />}
        key={2}
        label="Item 2"
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
    ]}
  />
);

export const CellActionsWithClickToCopy = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableCellActions
    enableClickToCopy
    renderCellActionMenuItems={({ closeMenu, table }) => [
      <MRT_ActionMenuItem
        icon={<Email />}
        key={1}
        label="Item 1"
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        icon={<PersonOffOutlined />}
        key={2}
        label="Item 2"
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
    ]}
  />
);

export const CellActionsWithBuiltIns = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    editDisplayMode="cell"
    enableCellActions
    enableClickToCopy="context-menu"
    enableEditing
    renderCellActionMenuItems={({ closeMenu, internalMenuItems, table }) => [
      ...internalMenuItems,
      <Divider key="divider" />,
      <MRT_ActionMenuItem
        icon={<Email />}
        key={1}
        label="Item 1"
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        icon={<PersonOffOutlined />}
        key={2}
        label="Item 2"
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
    ]}
  />
);
