import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Column,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Dragging Examples',
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

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ColumnDraggingEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnDragging
    onColumnDrop={({ event, draggedColumn }) =>
      console.info({ event, draggedColumn })
    }
  />
);

export const ColumnDraggingDisabledPerColumn: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
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
        enableColumnDragging: false,
      },
    ]}
    data={data}
    enableColumnDragging
  />
);

// export const DragColumnsBetweenTables: Story<MaterialReactTableProps> = () => {
//   const [columns1, setColumns1] = useState<MRT_ColumnDef<Person>[]>(
//     columns.slice(0, 2),
//   );
//   const [columns2, setColumns2] = useState<MRT_ColumnDef<Person>[]>(
//     columns.slice(2, 4),
//   );

//   const [draggingColumn, setDraggingColumn] =
//     useState<MRT_Column<Person> | null>(null);

//   return (
//     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
//       <MaterialReactTable
//         columns={columns1}
//         data={data}
//         enableColumnDragging
//         onColumnDrop={({ event, draggedColumn }) =>
//           setColumns2([...columns2, draggedColumn])
//         }
//         // onDraggingColumnChange={setDraggingColumn}
//         // state={{ draggingColumn }}
//       />
//       <MaterialReactTable
//         columns={columns2}
//         data={data}
//         enableColumnDragging
//         onColumnDrop={({ event, draggedColumn }) =>
//           setColumns1([...columns1, draggedColumn])
//         }
//         // onDraggingColumnChange={setDraggingColumn}
//         // state={{ draggingColumn }}
//       />
//     </div>
//   );
// };
