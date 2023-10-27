import { useMemo, useState } from 'react';
import {
  MRT_TableContainer,
  useMaterialReactTable,
} from 'material-react-table';
import { data as initData } from './makeData';

const Example = () => {
  const columns = useMemo(
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
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  const [data, setData] = useState(() => initData);

  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    columns,
    data,
    enableRowOrdering: true,
    enableSorting: false,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          data.splice(
            hoveredRow.index,
            0,
            data.splice(draggingRow.index, 1)[0],
          );
          setData([...data]);
        }
      },
    }),
  });

  return <MRT_TableContainer table={table} />;
};

export default Example;
