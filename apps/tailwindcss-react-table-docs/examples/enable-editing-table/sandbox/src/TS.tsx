import React, { useMemo, useState } from 'react';
import TailwindCSSReactTable, {
  type TRT_Cell,
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<TRT_ColumnDef<Person>[]>(
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

  const handleSaveCell = (cell: TRT_Cell<Person>, value: any) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    tableData[cell.row.index][cell.column.id as keyof Person] = value;
    //send/receive api updates here
    setTableData([...tableData]); //re-render with new data
  };

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={tableData}
      editingMode="table"
      enableEditing
      muiTableBodyCellEditTextFieldProps={({ cell }) => ({
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
