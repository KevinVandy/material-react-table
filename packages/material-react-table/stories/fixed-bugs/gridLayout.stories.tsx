import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Fixed Bugs/Grid Layout',
};

export default meta;

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
};

const columns: MRT_ColumnDef<Person>[] = [
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
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
];

const data = [...Array(6)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const CenterAlignInGridLayoutMode = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      muiTableHeadCellProps={{
        align: 'center',
      }}
      muiTableBodyCellProps={{
        align: 'center',
      }}
    />
  );
};

export const RightAlignInGridLayoutMode = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      muiTableHeadCellProps={{
        align: 'right',
      }}
      muiTableBodyCellProps={{
        align: 'right',
      }}
    />
  );
};
