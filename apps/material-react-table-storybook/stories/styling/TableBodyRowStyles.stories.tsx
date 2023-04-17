import React from 'react';
import { Meta } from '@storybook/react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Style Table Body Rows',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
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
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
];
const data = [...Array(21)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const DefaultTableBodyRowStyles = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const DisableRowHoverEffect = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyRowProps={{
      hover: false,
    }}
  />
);

export const StyleMuiTableBodyRow = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyRowProps={{
      sx: {
        backgroundColor: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
      },
    }}
  />
);

export const StyleCustomStripedRows = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyProps={{
      sx: () => ({
        '& tr:nth-of-type(odd)': {
          backgroundColor: 'limegreen',
        },
      }),
    }}
    muiTableBodyCellProps={{ sx: { border: 'none' } }}
  />
);

export const StyleCustomStripedRowsDetailPanel = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyProps={{
      sx: () => ({
        '& tr:nth-child(4n+3)': {
          backgroundColor: 'limegreen',
        },
      }),
    }}
    muiTableBodyCellProps={{ sx: { border: 'none' } }}
    renderDetailPanel={() => <div>Detail Panel</div>}
  />
);

export const ConditionallyStyleMuiTableRow = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyRowProps={({ row }) => ({
      sx: {
        backgroundColor:
          row.getValue<number>('age') > 50 ? 'rgba(255, 54, 33, 0.18)' : '',
        fontStyle: 'italic',
      },
    })}
  />
);
