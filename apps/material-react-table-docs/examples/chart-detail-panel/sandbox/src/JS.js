import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { data } from './makeData';

const Example = () => {
  const theme = useTheme();

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { expanded: { 0: true } },
    muiTableBodyRowProps: {
      sx: {
        '.Mui-TableBodyCell-DetailPanel': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
        },
      },
    },
    renderDetailPanel: ({ row }) => (
      <LineChart
        xAxis={[
          {
            data: row.original.gamesPlayed,
            label: 'Games Played',
            valueFormatter: (value) => `#${value}`,
            tickLabelInterval: (value) => value % 1 === 0,
          },
        ]}
        yAxis={[{ min: 0, max: 100 }]}
        series={[
          {
            color: theme.palette.primary.dark,
            data: row.original.points,
            label: 'Points',
          },
          {
            color: theme.palette.secondary.main,
            data: row.original.assists,
            label: 'Assists',
          },
          {
            color: theme.palette.error.main,
            data: row.original.turnovers,
            label: 'Turnovers',
          },
        ]}
        height={250}
      />
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
