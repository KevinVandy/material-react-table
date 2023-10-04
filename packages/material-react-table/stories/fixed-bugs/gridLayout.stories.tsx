import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Fixed Bugs/Grid Layout',
};

export default meta;

type Person = {
  address: string;
  city: string;
  firstName: string;
  lastName: string;
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
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  state: faker.location.state(),
}));

export const CenterAlignInGridLayoutMode = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      muiTableBodyCellProps={{
        align: 'center',
      }}
      muiTableHeadCellProps={{
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
      muiTableBodyCellProps={{
        align: 'right',
      }}
      muiTableHeadCellProps={{
        align: 'right',
      }}
    />
  );
};
