import {
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
} from 'material-react-table';
import { IconButton, Box, Button, Typography, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { data, type Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
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
];

const Example = () => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: { showGlobalFilter: true },
  });

  return (
    <Box sx={{ border: 'gray 2px dashed', padding: '16px' }}>
      {/* Our Custom External Top Toolbar */}
      <Box
        sx={(theme) => ({
          display: 'flex',
          backgroundColor: 'inherit',
          borderRadius: '4px',
          flexDirection: 'row',
          gap: '16px',
          justifyContent: 'space-between',
          padding: '24px 16px',
          '@media max-width: 768px': {
            flexDirection: 'column',
          },
        })}
      >
        <Box>
          <Button
            color="primary"
            onClick={() => {
              alert('Add User');
            }}
            variant="contained"
          >
            Create New Account
          </Button>
        </Box>
        <MRT_GlobalFilterTextField table={table} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          <Tooltip title="Print">
            <IconButton onClick={() => window.print()}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {/* Some Page Content */}
      <Typography p="16px 4px">
        {
          "Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
        }
      </Typography>
      {/* The MRT Table with no toolbars built-in */}
      <MRT_TableContainer table={table} />
      {/* Our Custom Bottom Toolbar */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MRT_TablePagination table={table} />
        </Box>
        <Box sx={{ display: 'grid', width: '100%' }}>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Box>
      </Box>
    </Box>
  );
};

export default Example;
