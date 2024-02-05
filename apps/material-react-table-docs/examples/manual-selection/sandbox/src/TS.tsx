import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'material-react-table';

//data definitions...
interface Person {
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  city: string;
  state: string;
}
//end

const data = [
  //data definitions...
  {
    userId: '3f25309c-8fa1-470f-811e-cdb082ab9017', //we'll use this as a unique row id
    firstName: 'Dylan',
    lastName: 'Murray',
    age: 22,
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    userId: 'be731030-df83-419c-b3d6-9ef04e7f4a9f',
    firstName: 'Raquel',
    lastName: 'Kohler',
    age: 18,
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  //end
];

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
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
    ],
    [],
    //end
  );

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const table = useMaterialReactTable({
    columns,
    data,
    getRowId: (row) => row.userId,
    muiTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () =>
        setRowSelection((prev) => ({
          ...prev,
          [row.id]: !prev[row.id], //this is a simple toggle implementation
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: 'pointer',
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
