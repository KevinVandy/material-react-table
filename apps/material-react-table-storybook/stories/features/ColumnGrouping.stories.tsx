import React, { useEffect, useMemo, useState } from 'react';
import { Meta } from '@storybook/react';
import MaterialReactTable, {
  type TRT_Column,
  type TRT_ColumnDef,
} from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Grouping Examples',
};

export default meta;

interface Person {
  firstName: string;
  lastName: string;
  gender: string;
  city: string;
  state: string;
}

const columns = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
] as TRT_ColumnDef<Person>[];

const data = [...Array(200)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  gender: faker.name.sex(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ColumnGroupingEnabled = () => (
  <MaterialReactTable columns={columns} data={data} enableGrouping />
);

export const ColumnGroupingEnabledWithSelection = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    enableRowSelection
    initialState={{ grouping: ['state'], expanded: true }}
  />
);

export const ColumnGroupingNoDragHandles = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    enableColumnDragging={false}
  />
);

export const ColumnGroupingEnabledDropZoneBottom = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    positionToolbarDropZone="bottom"
  />
);

export const ColumnGroupingEnabledCustomAggregate = () => (
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
        header: 'Gender',
        accessorKey: 'gender',
        AggregatedCell: ({ cell }) => (
          <div style={{ color: 'red' }}>{cell.renderValue() as string}</div>
        ),
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
    ]}
    data={data}
    enableGrouping
  />
);

export const ColumnGroupingBannerOnBottom = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    positionToolbarAlertBanner="bottom"
  />
);

export const GroupingColumnsSetState = () => {
  const [columns, setColumns] = useState<TRT_ColumnDef<any>[]>([]);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    // Do something and set columns and data

    setColumns([
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address', //normal accessorKey
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
    ]);

    setData([
      {
        name: {
          firstName: 'John',
          lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
      },
      {
        name: {
          firstName: 'Jane',
          lastName: 'Doe',
        },
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
      },
      {
        name: {
          firstName: 'Joe',
          lastName: 'Doe',
        },
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
      },
      {
        name: {
          firstName: 'Kevin',
          lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
      },
      {
        name: {
          firstName: 'Joshua',
          lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
      },
    ]);
  }, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableGrouping
      state={{ columnOrder: columns.map((c) => c.accessorKey as string) }}
    />
  );
};

export const ColumnGroupingDropZoneAlwaysVisible = () => {
  const [draggingColumn, setDraggingColumn] =
    useState<TRT_Column<Person> | null>(null);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableGrouping
      localization={
        !draggingColumn
          ? { dropToGroupBy: 'Drag a column here to group by it' }
          : undefined
      }
      muiTopToolbarProps={{
        sx: {
          '& .Mui-ToolbarDropZone': {
            border: '1px solid red',
            zIndex: '2 !important',
          },
        },
      }}
      onDraggingColumnChange={setDraggingColumn}
      positionToolbarAlertBanner="bottom"
      state={{ draggingColumn, showToolbarDropZone: true }}
    />
  );
};

export const GroupingStateManaged = () => {
  const [grouping, setGrouping] = useState<string[]>([]);
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableGrouping
      state={{ grouping }}
      onGroupingChange={setGrouping}
    />
  );
};

export const GroupingAndDraggingWithSomeDisabledGrouping = () => {
  const _columns = useMemo<TRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        enableGrouping: false,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={_columns}
      data={data}
      enableColumnDragging
      enableGrouping
    />
  );
};
