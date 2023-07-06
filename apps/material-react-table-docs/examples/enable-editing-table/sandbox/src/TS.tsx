import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_Cell,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
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
      }, //end
    ],
    [],
  );

  const [tableData, setTableData] = useState<Person[]>(() => data);

  const handleSaveCell = (cell: MRT_Cell<Person>, value: any) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    tableData[cell.row.index][cell.column.id as keyof Person] = value;
    //send/receive api updates here
    setTableData([...tableData]); //re-render with new data
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editingMode="table"
      enableEditing
      muiEditTextFieldProps={({ cell }) => ({
        //onBlur is more efficient, but could use onChange instead
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
        variant: 'outlined',
      })}
    />
  );
};

export default Example;
