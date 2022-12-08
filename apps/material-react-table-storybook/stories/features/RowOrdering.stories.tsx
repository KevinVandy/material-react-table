import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Row Ordering Examples',
};

export default meta;

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
};

const columns: MRT_ColumnDef<Person>[] = [
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
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const initData = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const RowOrderingEnabled: Story<MaterialReactTableProps> = () => {
  const [data, setData] = useState(() => initData);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowOrdering
      enableSorting={false}
      muiTableBodyRowDragHandleProps={({ table }) => ({
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

export const RowOrderingWithSelect: Story<MaterialReactTableProps> = () => {
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
      muiTableBodyRowDragHandleProps={{
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

export const RowOrderingWithPinning: Story<MaterialReactTableProps> = () => {
  const [data, setData] = useState(() => initData);
  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredRow, setHoveredRow] = useState<MRT_Row<Person> | null>(null);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowOrdering
      enablePinning
      enableSorting={false}
      muiTableBodyRowDragHandleProps={{
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

export const RowAndColumnOrdering: Story<MaterialReactTableProps> = () => {
  const [data, setData] = useState(() => initData);
  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredRow, setHoveredRow] = useState<MRT_Row<Person> | null>(null);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableColumnOrdering
      enablePinning
      enableRowOrdering
      enableSorting={false}
      muiTableBodyRowDragHandleProps={{
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
