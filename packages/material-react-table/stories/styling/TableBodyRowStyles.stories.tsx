import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Style Table Body Rows',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];
const data = [...Array(21)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
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
    muiTableBodyCellProps={{ sx: { border: 'none' } }}
    muiTableBodyProps={{
      sx: () => ({
        '& tr:nth-of-type(odd)': {
          backgroundColor: 'limegreen',
        },
      }),
    }}
  />
);

export const StyleCustomStripedRowsDetailPanel = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyCellProps={{ sx: { border: 'none' } }}
    muiTableBodyProps={{
      sx: () => ({
        '& tr:nth-child(4n+3)': {
          backgroundColor: 'limegreen',
        },
      }),
    }}
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
