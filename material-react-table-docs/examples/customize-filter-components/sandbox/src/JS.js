import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { FilterAlt } from '@mui/icons-material';

const Example = () => {
  const columns = useMemo(
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
        //automatically turns textfield into select box
        filterSelectOptions: [
          { text: 'Male', value: 'Male' },
          { text: 'Female', value: 'Female' },
          { text: 'Other', value: 'Other' },
        ],
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterFn: 'between',
      },
    ],
    [],
  );

  const data = useMemo(
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
      enableColumnFilterChangeMode={false}
      initialState={{ showColumnFilters: true }} //show filters by default
      muiTableHeadCellFilterTextFieldProps={{
        InputProps: {
          startAdornment: <FilterAlt />,
        },
        sx: { m: '0.5rem 0', width: '100%' },
        variant: 'outlined',
      }}
    />
  );
};

export default Example;
