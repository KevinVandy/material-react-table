import React, { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
};

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        muiTableHeadCellFilterTextFieldProps: { placeholder: 'ID' },
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
        filterFn: 'equals',
        filterSelectOptions: [
          { text: 'Male', value: 'Male' },
          { text: 'Female', value: 'Female' },
          { text: 'Other', value: 'Other' },
        ],
        filterVariant: 'select',
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
      },
    ],
    [],
  );

  const data = useMemo<Person[]>(
    //data definitions...
    () => [
      {
        id: 1,
        firstName: 'Hugh',
        lastName: 'Mungus',
        gender: 'Male',
        age: 42,
      },
      {
        id: 2,
        firstName: 'Leroy',
        lastName: 'Jenkins',
        gender: 'Male',
        age: 51,
      },
      {
        id: 3,
        firstName: 'Candice',
        lastName: 'Nutella',
        gender: 'Female',
        age: 27,
      },
      {
        id: 4,
        firstName: 'Micah',
        lastName: 'Johnson',
        gender: 'Other',
        age: 32,
      },
    ],
    [],
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{ showColumnFilters: true }} //show filters by default
      muiTableHeadCellFilterTextFieldProps={{
        sx: { m: '0.5rem 0', width: '100%' },
        variant: 'outlined',
      }}
    />
  );
};

export default Example;
