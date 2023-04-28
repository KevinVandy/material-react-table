import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';
import { Button } from '@mui/material';

const meta: Meta = {
  title: 'Features/Memo Mode Examples',
};

export default meta;

type Person = {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

const columns: TRT_ColumnDef<Person>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'gender',
    accessorKey: 'gender',
  },
  {
    header: 'Age',
    accessorKey: 'age',
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
  {
    header: 'Zip',
    accessorKey: 'zipCode',
  },
];

const generateData = () =>
  [...Array(55)].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    gender: faker.name.sex(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
  }));

export const NoMemos = () => {
  const [tableData, setTableData] = React.useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={tableData}
      editingMode="row"
      enableColumnOrdering
      enableEditing
      enableGrouping
      enablePinning
      enableRowNumbers
      enableRowOrdering
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
      renderTopToolbarCustomActions={() => (
        <Button onClick={handleRegenerateData} variant="contained">
          Regenerate Data
        </Button>
      )}
    />
  );
};

export const MemoCells = () => {
  const [tableData, setTableData] = React.useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={tableData}
      editingMode="row"
      enableColumnOrdering
      enableEditing
      enableGrouping
      enablePinning
      enableRowNumbers
      enableRowOrdering
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
      memoMode="cells"
      renderTopToolbarCustomActions={() => (
        <Button onClick={handleRegenerateData} variant="contained">
          Regenerate Data
        </Button>
      )}
    />
  );
};

export const MemoRows = () => {
  const [tableData, setTableData] = React.useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={tableData}
      editingMode="row"
      enableColumnOrdering
      enableEditing
      enableGrouping
      enablePinning
      enableRowNumbers
      enableRowOrdering
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
      memoMode="rows"
      renderTopToolbarCustomActions={() => (
        <Button onClick={handleRegenerateData} variant="contained">
          Regenerate Data
        </Button>
      )}
    />
  );
};

export const MemoTableBody = () => {
  const [tableData, setTableData] = React.useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={tableData}
      editingMode="row"
      enableColumnOrdering
      enableEditing
      enableGrouping
      enablePinning
      enableRowNumbers
      enableRowOrdering
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
      memoMode="table-body"
      renderTopToolbarCustomActions={() => (
        <Button onClick={handleRegenerateData} variant="contained">
          Regenerate Data
        </Button>
      )}
    />
  );
};
