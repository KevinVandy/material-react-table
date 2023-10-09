import { useState } from 'react';
import Button from '@mui/material/Button';
import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Memo Mode Examples',
};

export default meta;

type Person = {
  address: string;
  age: number;
  city: string;
  firstName: string;
  gender: string;
  lastName: string;
  state: string;
  zipCode: string;
};

const columns: MRT_ColumnDef<Person>[] = [
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
    header: 'gender',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
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
  {
    accessorKey: 'zipCode',
    header: 'Zip',
  },
];

const generateData = () =>
  [...Array(55)].map(() => ({
    address: faker.location.streetAddress(),
    age: faker.number.int(80),
    city: faker.location.city(),
    firstName: faker.person.firstName(),
    gender: Math.random() < 0.9 ? faker.person.sex() : faker.person.gender(),
    lastName: faker.person.lastName(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
  }));

export const NoMemos = () => {
  const [tableData, setTableData] = useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editDisplayMode="row"
      enableColumnOrdering
      enableColumnPinning
      enableEditing
      enableGrouping
      enableRowNumbers
      enableRowOrdering
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageIndex: 0, pageSize: 100 } }}
      renderTopToolbarCustomActions={() => (
        <Button onClick={handleRegenerateData} variant="contained">
          Regenerate Data
        </Button>
      )}
    />
  );
};

export const MemoCells = () => {
  const [tableData, setTableData] = useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editDisplayMode="row"
      enableColumnOrdering
      enableColumnPinning
      enableEditing
      enableGrouping
      enableRowNumbers
      enableRowOrdering
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageIndex: 0, pageSize: 100 } }}
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
  const [tableData, setTableData] = useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editDisplayMode="row"
      enableColumnOrdering
      enableColumnPinning
      enableEditing
      enableGrouping
      enableRowNumbers
      enableRowOrdering
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageIndex: 0, pageSize: 100 } }}
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
  const [tableData, setTableData] = useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editDisplayMode="row"
      enableColumnOrdering
      enableColumnPinning
      enableEditing
      enableGrouping
      enableRowNumbers
      enableRowOrdering
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageIndex: 0, pageSize: 100 } }}
      memoMode="table-body"
      renderTopToolbarCustomActions={() => (
        <Button onClick={handleRegenerateData} variant="contained">
          Regenerate Data
        </Button>
      )}
    />
  );
};
