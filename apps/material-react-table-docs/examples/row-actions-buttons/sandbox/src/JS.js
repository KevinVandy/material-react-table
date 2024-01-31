import { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { data as initialData } from './makeData';

export const Example = () => {
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

  const [data, setData] = useState(initialData);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      displayColumnDefOptions={{
        'mrt-row-actions': {
          size: 180, //if using layoutMode that is not 'semantic', the columns will not auto-size, so you need to set the size manually
          grow: false,
        },
      }}
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <IconButton
            color="primary"
            onClick={() =>
              window.open(
                `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`,
              )
            }
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              data.splice(row.index, 1); //assuming simple data table
              setData([...data]);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default Example;
