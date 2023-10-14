import { useMemo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
} from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { data, type Person } from './makeData';

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
        accessorKey: 'salary',
        header: 'Salary',
      },
    ],
    [],
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      positionToolbarAlertBanner="bottom" //show selected rows count on bottom toolbar
      //add custom action buttons to top-left of top toolbar
      renderTopToolbarCustomActions={({ table }) => (
        <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
          <Button
            color="secondary"
            onClick={() => {
              alert('Create New Account');
            }}
            variant="contained"
          >
            Create Account
          </Button>
          <Button
            color="error"
            disabled={!table.getIsSomeRowsSelected()}
            onClick={() => {
              alert('Delete Selected Accounts');
            }}
            variant="contained"
          >
            Delete Selected Accounts
          </Button>
        </Box>
      )}
      //customize built-in buttons in the top-right of top toolbar
      renderToolbarInternalActions={({ table }) => (
        <Box>
          {/* add custom button to print table  */}
          <IconButton
            onClick={() => {
              window.print();
            }}
          >
            <PrintIcon />
          </IconButton>
          {/* along-side built-in buttons in whatever order you want them */}
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ToggleFullScreenButton table={table} />
        </Box>
      )}
    />
  );
};

export default Example;
