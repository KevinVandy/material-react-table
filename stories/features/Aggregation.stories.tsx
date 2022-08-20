import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';
import { Box } from '@mui/material';

const meta: Meta = {
  title: 'Features/Aggregation Examples',
};

export default meta;

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
    header: 'Age',
    accessorKey: 'age',
    aggregationFn: 'max',
    AggregatedCell: ({ cell, table }) => (
      <>
        Average by{' '}
        {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
        <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
          {cell.getValue<number>()}
        </Box>
      </>
    ),
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
    GroupedCell: ({ cell }) => (
      <Box sx={{ color: 'primary.main' }}>{cell.getValue<string>()}</Box>
    ),
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Salary',
    accessorKey: 'salary',
    aggregationFn: 'mean',
    AggregatedCell: ({ cell, table }) => (
      <>
        Average by{' '}
        {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
        <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
          {cell.getValue<number>()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      </>
    ),
    Cell: ({ cell }) => (
      <>
        {cell.getValue<number>()?.toLocaleString?.('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </>
    ),
  },
] as MRT_ColumnDef<typeof data[0]>[];

const data = [...Array(200)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number({ min: 18, max: 65 }),
  gender: faker.name.gender(true),
  state: faker.address.state(),
  salary: Number(faker.finance.amount(10000, 100000, 0)),
}));

export const Aggregation: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableGrouping />
);

export const AggregationExpandedDefault: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    initialState={{ expanded: true }}
  />
);

export const AggregationGroupedAndExpandedDefault: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    initialState={{ expanded: true, grouping: ['state', 'gender'] }}
  />
);
