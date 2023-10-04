import { useState } from 'react';
import {
  type MRT_ColumnDef,
  type MRT_Row,
  MaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Row Ordering Examples',
};

export default meta;

type Person = {
  address: string;
  city: string;
  email: string;
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
    accessorKey: 'email',
    header: 'Email Address',
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

const initData = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  state: faker.location.state(),
}));

export const RowOrderingEnabled = () => {
  const [data, setData] = useState(() => initData);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowOrdering
      enableSorting={false}
      muiRowDragHandleProps={({ table }) => ({
        onDragEnd: () => {
          const { draggingRow, hoveredRow } = table.getState();
          if (hoveredRow && draggingRow) {
            data.splice(
              (hoveredRow as MRT_Row<Person>).index,
              0,
              data.splice(draggingRow.index, 1)[0],
            );
            setData([...data]);
          }
        },
      })}
    />
  );
};

export const RowOrderingWithSelect = () => {
  const [data, setData] = useState(() => initData);
  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredRow, setHoveredRow] = useState<MRT_Row<Person> | null>(null);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowOrdering
      enableRowSelection
      enableSorting={false}
      getRowId={(row) => row.email}
      muiRowDragHandleProps={{
        onDragEnd: () => {
          if (hoveredRow && draggingRow) {
            data.splice(
              hoveredRow.index,
              0,
              data.splice(draggingRow.index, 1)[0],
            );
            setData([...data]);
          }
        },
      }}
      onDraggingRowChange={setDraggingRow}
      onHoveredRowChange={setHoveredRow}
      state={{
        draggingRow,
        hoveredRow,
      }}
    />
  );
};

export const RowOrderingWithPinning = () => {
  const [data, setData] = useState(() => initData);
  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredRow, setHoveredRow] = useState<MRT_Row<Person> | null>(null);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableColumnPinning
      enableRowOrdering
      enableSorting={false}
      muiRowDragHandleProps={{
        onDragEnd: () => {
          if (hoveredRow && draggingRow) {
            data.splice(
              hoveredRow.index,
              0,
              data.splice(draggingRow.index, 1)[0],
            );
            setData([...data]);
          }
        },
      }}
      onDraggingRowChange={setDraggingRow}
      onHoveredRowChange={setHoveredRow}
      state={{
        draggingRow,
        hoveredRow,
      }}
    />
  );
};

export const RowAndColumnOrdering = () => {
  const [data, setData] = useState(() => initData);
  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredRow, setHoveredRow] = useState<MRT_Row<Person> | null>(null);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableColumnOrdering
      enableColumnPinning
      enableRowOrdering
      enableSorting={false}
      muiRowDragHandleProps={{
        onDragEnd: () => {
          if (hoveredRow && draggingRow) {
            data.splice(
              hoveredRow.index,
              0,
              data.splice(draggingRow.index, 1)[0],
            );
            setData([...data]);
          }
        },
      }}
      onDraggingRowChange={setDraggingRow}
      onHoveredRowChange={setHoveredRow}
      state={{
        draggingRow,
        hoveredRow,
      }}
    />
  );
};
