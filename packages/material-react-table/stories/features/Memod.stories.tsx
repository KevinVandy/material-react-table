import { useState } from 'react';
import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import Button from '@mui/material/Button';

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

const columns: MRT_ColumnDef<Person>[] = [
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
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: Math.random() < 0.9 ? faker.person.sex() : faker.person.gender(),
    age: faker.datatype.number(80),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
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
      enableEditing
      enableGrouping
      enableColumnPinning
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
  const [tableData, setTableData] = useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editDisplayMode="row"
      enableColumnOrdering
      enableEditing
      enableGrouping
      enableColumnPinning
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
  const [tableData, setTableData] = useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editDisplayMode="row"
      enableColumnOrdering
      enableEditing
      enableGrouping
      enableColumnPinning
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
  const [tableData, setTableData] = useState([...generateData()]);

  const handleRegenerateData = () => setTableData([...generateData()]);

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editDisplayMode="row"
      enableColumnOrdering
      enableEditing
      enableGrouping
      enableColumnPinning
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
