import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Grouping Examples',
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
] as MRT_ColumnDef<typeof data[0]>[];

const data = [...Array(200)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  gender: faker.name.sex(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ColumnGroupingEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableGrouping />
);

export const ColumnGroupingNoDragHandles: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    enableColumnDragging={false}
  />
);

export const ColumnGroupingEnabledDropZoneBottom: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    positionToolbarDropZone="bottom"
  />
);

export const ColumnGroupingEnabledCustomAggregate: Story<
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

export const ColumnGroupingBannerOnBottom: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGrouping
    positionToolbarAlertBanner="bottom"
  />
);
