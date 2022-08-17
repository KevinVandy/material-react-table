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
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      tableData[row.index] = values;
      //send/receive api updates here
      setTableData([...tableData]);
    };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editingMode="modal" //default
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};

export default Example;
