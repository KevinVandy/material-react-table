import React from 'react';
 import { Meta } from '@storybook/react';
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Row Dragging Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof initData)[0]>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Email Address',
    accessorKey: 'email',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const initData = [...Array(25)].map(() => ({
  id: faker.random.alphaNumeric(6),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  age: faker.datatype.number(20) + 18,
  state: faker.address.state(),
}));

export const RowDraggingEnabled = () => {
  const [data, _setData] = React.useState(() => initData);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowDragging
    />
  );
};
