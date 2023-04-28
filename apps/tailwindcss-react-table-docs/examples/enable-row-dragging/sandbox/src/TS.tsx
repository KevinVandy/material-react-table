import React, { useMemo, useState } from 'react';
import TailwindCSSReactTable, {
  type TailwindCSSReactTableProps,
  type TRT_ColumnDef,
  type TRT_Row,
} from 'tailwindcss-react-table';
import { Box, Typography } from '@mui/material';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<TRT_ColumnDef<Person>[]>(
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

  const [data1, setData1] = useState<Person[]>(() => data.slice(0, 3));
  const [data2, setData2] = useState<Person[]>(() => data.slice(3, 5));

  const [draggingRow, setDraggingRow] = useState<TRT_Row<Person> | null>(null);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const commonTableProps: Partial<TailwindCSSReactTableProps<Person>> & {
    columns: TRT_ColumnDef<Person>[];
  } = {
    columns,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    muiTableContainerProps: {
      sx: {
        minHeight: '320px',
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'auto', lg: '1fr 1fr' },
        gap: '1rem',
        overflow: 'auto',
        p: '4px',
      }}
    >
      <TailwindCSSReactTable
        {...commonTableProps}
        data={data1}
        getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
        muiTableBodyRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === 'table-2') {
              setData2((data2) => [...data2, draggingRow!.original]);
              setData1((data1) =>
                data1.filter((d) => d !== draggingRow!.original),
              );
            }
            setHoveredTable(null);
          },
        }}
        muiTablePaperProps={{
          onDragEnter: () => setHoveredTable('table-1'),
          sx: {
            outline: hoveredTable === 'table-1' ? '2px dashed pink' : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Typography color="success.main" component="span" variant="h4">
            Nice List
          </Typography>
        )}
      />
      <TailwindCSSReactTable
        {...commonTableProps}
        data={data2}
        defaultColumn={{
          size: 100,
        }}
        getRowId={(originalRow) => `table-2-${originalRow.firstName}`}
        muiTableBodyRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === 'table-1') {
              setData1((data1) => [...data1, draggingRow!.original]);
              setData2((data2) =>
                data2.filter((d) => d !== draggingRow!.original),
              );
            }
            setHoveredTable(null);
          },
        }}
        muiTablePaperProps={{
          onDragEnter: () => setHoveredTable('table-2'),
          sx: {
            outline: hoveredTable === 'table-2' ? '2px dashed pink' : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Typography color="error.main" component="span" variant="h4">
            Naughty List
          </Typography>
        )}
      />
    </Box>
  );
};

export default Example;
