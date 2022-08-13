import React, { FC, useMemo, useState } from 'react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';
import { data, Person } from './makeData';

const Example: FC = () => {
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

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] =
    async ({ row, values }) => {
      //a simple values assignment only works here if you have flat data and simple accessorKeys/ids. Otherwise, see Nested Editing Data example.
      tableData[row.index] = values;
      //send to api here maybe
      //then refetch and update local state here to render new updated data in the table
      setTableData([...tableData]);
    };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};

export default Example;
