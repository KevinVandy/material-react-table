import Button from '@mui/material/Button';
import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Styling Display Columns',
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

export const CustomizeDisplayColumns = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-actions': {
        muiTableHeadCellProps: {
          sx: {
            fontSize: '1.25rem',
            fontStyle: 'italic',
          },
        },
        size: 160,
      },
      'mrt-row-expand': {
        enableColumnActions: true,
        enableResizing: true,
        size: 70,
      },
      'mrt-row-numbers': {
        enableColumnOrdering: true,
        muiTableBodyCellProps: {
          sx: {
            color: 'red',
            fontSize: '1.5rem',
          },
        },
      },
    }}
    enableColumnOrdering
    enableColumnResizing
    enableRowActions
    enableRowNumbers
    enableRowSelection
    renderDetailPanel={() => <div>Detail Panel</div>}
    renderRowActions={({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Button
          color="primary"
          onClick={() => {
            console.info('View Profile', row);
          }}
          variant="contained"
        >
          View
        </Button>
        <Button
          color="error"
          onClick={() => {
            console.info('Remove', row);
          }}
          variant="contained"
        >
          Remove
        </Button>
      </div>
    )}
  />
);
