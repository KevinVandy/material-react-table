import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilterChangeMode: false, //disable changing filter mode
        filterFn: 'equals', //set filter mode to equals
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        enabledColumnFilterOptions: ['fuzzy', 'contains', 'startsWith'],
        header: 'First Name',
      },
      {
        accessorKey: 'middleName',
        enableColumnFilterChangeMode: false, //disable changing filter mode
        filterFn: 'startsWith', //even though changing the mode is disabled, you can still set the default filter mode
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName', //normal
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        enabledColumnFilterOptions: ['between', 'greaterThan', 'lessThan'],
        filterFn: 'between',
        header: 'Age',
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
        middleName: 'Jay',
        lastName: 'Mungus',
        age: 42,
      },
      {
        id: 2,
        firstName: 'Leroy',
        middleName: 'Leroy',
        lastName: 'Jenkins',
        age: 51,
      },
      {
        id: 3,
        firstName: 'Candice',
        middleName: 'Denise',
        lastName: 'Nutella',
        age: 27,
      },
      {
        id: 4,
        firstName: 'Micah',
        middleName: 'Henry',
        lastName: 'Johnson',
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
    />
  );
};

export default Example;
