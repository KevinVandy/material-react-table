import { type ReactNode, useEffect, useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  type MRT_Column,
  type MRT_ColumnDef,
  type MRT_Row,
  MaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Column Grouping Examples',
};

export default meta;

interface Person {
  city: string;
  firstName: string;
  gender: string;
  lastName: string;
  state: string;
}

const columns = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
] as MRT_ColumnDef<Person>[];

const data = [...Array(200)].map(() => ({
  city: faker.location.city(),
  firstName: faker.person.firstName(),
  gender: Math.random() < 0.9 ? faker.person.sex() : faker.person.gender(),
  lastName: faker.person.lastName(),
  state: faker.location.state(),
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
    initialState={{ expanded: true, grouping: ['state'] }}
  />
);

export const ColumnGroupingNoDragHandles = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnDragging={false}
    enableGrouping
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
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        AggregatedCell: ({ cell }) => (
          <div style={{ color: 'red' }}>{cell.renderValue() as string}</div>
        ),
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
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
  const [columns, setColumns] = useState<MRT_ColumnDef<any>[]>([]);
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
        address: '261 Erdman Ford',
        city: 'East Daphne',
        name: {
          firstName: 'John',
          lastName: 'Doe',
        },
        state: 'Kentucky',
      },
      {
        address: '769 Dominic Grove',
        city: 'Columbus',
        name: {
          firstName: 'Jane',
          lastName: 'Doe',
        },
        state: 'Ohio',
      },
      {
        address: '566 Brakus Inlet',
        city: 'South Linda',
        name: {
          firstName: 'Joe',
          lastName: 'Doe',
        },
        state: 'West Virginia',
      },
      {
        address: '722 Emie Stream',
        city: 'Lincoln',
        name: {
          firstName: 'Kevin',
          lastName: 'Vandy',
        },
        state: 'Nebraska',
      },
      {
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        name: {
          firstName: 'Joshua',
          lastName: 'Rolluffs',
        },
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
    useState<MRT_Column<Person> | null>(null);

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
      onGroupingChange={setGrouping}
      state={{ grouping }}
    />
  );
};

export const GroupingAndDraggingWithSomeDisabledGrouping = () => {
  const _columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        enableGrouping: false,
        header: 'First Name',
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

export const GroupingWithSingleColumn = () => {
  const _columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        AggregatedCell: ({ row, table }) => {
          const {
            options: {
              icons: { ExpandMoreIcon },
            },
          } = table;

          if (!row.groupingColumnId || !row.groupingValue) {
            return null;
          }

          return (
            <Stack alignItems="center" flexDirection="row">
              <IconButton
                onClick={() => row.toggleExpanded(!row.getIsExpanded())}
                size="small"
              >
                <ExpandMoreIcon
                  style={{
                    transform: `rotate(${!row.getIsExpanded() ? -90 : 0}deg)`,
                  }}
                />
              </IconButton>
              <Typography>{row.groupingValue as ReactNode}</Typography>
            </Stack>
          );
        },
        accessorKey: 'group',
        columnDefType: 'display',
        header: 'Group',
        muiTableBodyCellProps: ({ row }) => {
          return {
            sx: {
              justifyContent: 'left',
              pl: `calc(${row.depth * 16}px)`,
              textAlign: 'left',
            },
          };
        },
        visibleInShowHideMenu: false,
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
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={_columns}
      data={data}
      displayColumnDefOptions={{
        'mrt-row-expand': {
          enableHiding: false,
          visibleInShowHideMenu: false,
        },
      }}
      enableColumnDragging
      enableGrouping
      groupedColumnMode="remove"
      initialState={{
        columnVisibility: { 'mrt-row-expand': false },
        density: 'compact',
        grouping: ['gender', 'state'],
      }}
      muiTableBodyRowProps={({ row }) => {
        return {
          sx: {
            bgcolor:
              row.groupingColumnId === 'gender'
                ? 'darkgreen'
                : row.groupingColumnId === 'state'
                  ? 'slategrey'
                  : 'inherit',
          },
        };
      }}
    />
  );
};

export const GroupingWithSingleColumnTest = () => {
  const _columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={_columns}
      data={data}
      enableColumnDragging
      // enableExpandAll={false}
      enableGrouping
      enableGroupingSingleColumn
      groupedColumnMode="remove"
      initialState={{
        density: 'compact',
        grouping: ['gender', 'state'],
      }}
    />
  );
};
