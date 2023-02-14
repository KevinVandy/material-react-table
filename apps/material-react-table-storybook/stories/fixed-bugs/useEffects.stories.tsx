import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';
import { faker } from '@faker-js/faker';
import { ColumnFiltersState } from '@tanstack/react-table';

const meta: Meta = {
  title: 'Fixed Bugs/useEffects',
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

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const FilterModesRefetch: Story<MaterialReactTableProps> = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    console.log('refetch', columnFilters);
  }, [columnFilters]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      initialState={{ showColumnFilters: true }}
      state={{ columnFilters }}
      onColumnFiltersChange={setColumnFilters}
    />
  );
};
