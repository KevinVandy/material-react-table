import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  MRT_AggregationFns,
  type MRT_ColumnDef,
  MaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Aggregation Examples',
};

export default meta;

const data = [...Array(2000)].map(() => ({
  age: faker.number.int({ max: 65, min: 18 }),
  firstName: faker.person.firstName(),
  gender: Math.random() < 0.95 ? faker.person.sex() : faker.person.gender(),
  lastName: faker.person.lastName(),
  salary: Number(faker.finance.amount({ dec: 0, max: 100000, min: 10000 })),
  state: faker.location.state(),
}));

const averageSalary =
  data.reduce((acc, curr) => acc + curr.salary, 0) / data.length;

const averageAge = data.reduce((acc, curr) => acc + curr.age, 0) / data.length;

const columns = [
  {
    AggregatedCell: () => '-',
    accessorKey: 'firstName',
    enableGrouping: false,
    header: 'First Name',
  },
  {
    AggregatedCell: () => '-',
    accessorKey: 'lastName',
    enableGrouping: false,
    header: 'Last Name',
  },
  {
    AggregatedCell: ({ cell, table }) => (
      <>
        Max by{' '}
        {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
        <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
          {cell.getValue<number>()}
        </Box>
      </>
    ),
    Footer: () => (
      <Stack>
        Average Age:
        <Box color="warning.main">{Math.round(averageAge)}</Box>
      </Stack>
    ),
    accessorKey: 'age',
    aggregationFn: 'max',
    header: 'Age',
  },
  {
    GroupedCell: ({ cell }) => (
      <Box sx={{ color: 'primary.main' }}>{cell.getValue<string>()}</Box>
    ),
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    AggregatedCell: ({ cell, table }) => (
      <>
        Average by{' '}
        {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
        <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
          {cell.getValue<number>()?.toLocaleString?.('en-US', {
            currency: 'USD',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            style: 'currency',
          })}
        </Box>
      </>
    ),
    Cell: ({ cell }) => (
      <>
        {cell.getValue<number>()?.toLocaleString?.('en-US', {
          currency: 'USD',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
          style: 'currency',
        })}
      </>
    ),
    Footer: () => (
      <Stack>
        Average Salary:
        <Box color="warning.main">
          {averageSalary?.toLocaleString?.('en-US', {
            currency: 'USD',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            style: 'currency',
          })}
        </Box>
      </Stack>
    ),
    accessorKey: 'salary',
    aggregationFn: 'mean',
    enableGrouping: false,
    header: 'Salary',
  },
] as MRT_ColumnDef<(typeof data)[0]>[];

export const Aggregation = () => (
  <MaterialReactTable columns={columns} data={data} enableGrouping />
);

export const AggregationWithSelection = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    enableRowSelection
  />
);

export const AggregationExpandedDefault = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    initialState={{ expanded: true }}
  />
);

export const AggregationRemoveMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    groupedColumnMode="remove"
    initialState={{ expanded: true, grouping: ['state', 'gender'] }}
  />
);

export const AggregationFalseMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    groupedColumnMode={false}
    initialState={{ expanded: true, grouping: ['state', 'gender'] }}
  />
);

export const AggregationRemoveModeCustomGroupedCell = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-expand': {
        //last item in array of grouping state
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.getValue(grouping[grouping.length - 1]);
        },
      },
    }}
    enableGrouping
    groupedColumnMode="remove"
    initialState={{ expanded: true, grouping: ['state', 'gender'] }}
  />
);

export const AggregationGroupedAndExpandedDefault = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    initialState={{
      expanded: true,
      grouping: ['state', 'gender'],
      isFullScreen: true,
      pagination: { pageIndex: 0, pageSize: 20 },
    }}
  />
);

export const MultiAggregationPerColumn = () => (
  <MaterialReactTable
    columns={[
      {
        accessorKey: 'firstName',
        enableGrouping: false,
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        enableGrouping: false,
        header: 'Last Name',
      },
      {
        AggregatedCell: ({ cell, table }) => (
          <>
            Min by{' '}
            {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell.getValue<[number, number]>()[0]}
            </Box>
            <br />
            Max by{' '}
            {
              table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header
            }:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell.getValue<[number, number]>()[1]}
            </Box>
          </>
        ),
        Footer: () => (
          <Stack>
            Average Age:
            <Box color="warning.main">{Math.round(averageAge)}</Box>
          </Stack>
        ),
        accessorKey: 'age',
        //manually set multiple aggregation functions
        aggregationFn: (columnId, leafRows: any, childRows: any) => [
          MRT_AggregationFns.min(columnId, leafRows, childRows),
          MRT_AggregationFns.max(columnId, leafRows, childRows),
        ],
        header: 'Age',
      },
      {
        GroupedCell: ({ cell }) => (
          <Box sx={{ color: 'primary.main' }}>{cell.getValue<string>()}</Box>
        ),
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        AggregatedCell: ({ cell, table }) => (
          <>
            Count:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell.getValue<[number, number]>()?.[0]}
            </Box>
            <br />
            Average by{' '}
            {
              table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header
            }:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell
                .getValue<[number, number]>()?.[1]
                ?.toLocaleString?.('en-US', {
                  currency: 'USD',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                  style: 'currency',
                })}
            </Box>
          </>
        ),
        Cell: ({ cell }) => (
          <>
            {cell.getValue<number>()?.toLocaleString?.('en-US', {
              currency: 'USD',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
              style: 'currency',
            })}
          </>
        ),
        Footer: () => (
          <Stack>
            Average Salary:
            <Box color="warning.main">
              {averageSalary?.toLocaleString?.('en-US', {
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
                style: 'currency',
              })}
            </Box>
          </Stack>
        ),
        accessorKey: 'salary',
        aggregationFn: ['count', 'mean'], //multiple aggregation functions
        enableGrouping: false,
        header: 'Salary',
      },
    ]}
    data={data}
    enableGrouping
    initialState={{
      expanded: true,
      grouping: ['state', 'gender'],
      isFullScreen: true,
      pagination: { pageIndex: 0, pageSize: 20 },
    }}
  />
);
