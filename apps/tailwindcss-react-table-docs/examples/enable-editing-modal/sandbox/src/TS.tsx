import React, { useMemo, useState } from 'react';
import TailwindCSSReactTable, {
  type TailwindCSSReactTableProps,
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

  const handleSaveRow: TailwindCSSReactTableProps<Person>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      tableData[row.index] = values;
      //send/receive api updates here
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode
    };

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={tableData}
      editingMode="modal" //default
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};

export default Example;
