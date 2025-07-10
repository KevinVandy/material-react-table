import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react-vite';
import { useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from '../../src';
const meta: Meta = {
  title: 'Fixed Bugs/dragging virtual when filtered',
};
export default meta;
const initData = [...Array(25)].map(() => ({
  age: faker.number.int(20) + 18,
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  id: faker.string.alphanumeric(6),
  lastName: faker.person.lastName(),
}));
initData.push({
  age: 18,
  email: 'info@example.com',
  firstName: 'Foobar',
  lastName: 'Baz',
  id: '1',
});
const columns: MRT_ColumnDef<(typeof initData)[0]>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
];
export const DraggingRowWhenFiltered = () => {
  const [data, _setData] = useState(() => initData);
  const t = useMaterialReactTable({
    enableRowVirtualization: true,
    enableRowNumbers: true,
    columns: columns,
    data: data,
    enableRowDragging: true,
    initialState: {
      density: 'compact',
      columnFilters: [{ id: 'firstName', value: 'foo' }],
      showColumnFilters: true,
    },
  });
  return <MaterialReactTable table={t} />;
};
