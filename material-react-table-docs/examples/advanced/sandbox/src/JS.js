import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { makeData } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        id: 'employee', //id used to define `group` column
        header: 'Employee',
        columns: [
          {
            accessorKey: 'firstName', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: false,
            header: 'First Name',
          },
          {
            accessorKey: 'lastName',
            enableClickToCopy: false,
            header: 'Last Name',
            width: 60,
          },
          {
            accessorKey: 'email',
            header: 'Email',
          },
        ],
      },
      {
        id: 'jobInfo',
        header: 'Job Info',
        columns: [
          {
            accessorKey: 'salary',
            header: 'Salary',
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    Number(cell.getValue()) < 50_000
                      ? theme.palette.error.dark
                      : Number(cell.getValue()) >= 50_000 &&
                        Number(cell.getValue()) < 75_000
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {Number(cell.getValue())?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
            enableEditing: true,
          },
          {
            accessorKey: 'jobTitle',
            header: 'Job Title',
            width: 250,
          },
          {
            Cell: ({ cell }) => cell.getValue().toLocaleDateString(), //transform data to readable format for cell render
            Header: () => <em>Start Date</em>, //custom header markup
            accessorFn: (row) => new Date(row.startDate), //transform data before processing so sorting works
            accessorKey: 'startDate',
            header: 'Start Date',
            muiTableHeadCellFilterTextFieldProps: {
              type: 'date',
            },
            sortingFn: 'datetime',
          },
        ],
      },
    ],
    [],
  );

  const [employeeData, setEmployeeData] = useState(() => makeData());

  const handleSaveRow = ({ row }) => {
    employeeData[+row.index] = row._valuesCache;
    setEmployeeData([...employeeData]);
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={employeeData}
      enableClickToCopy
      enableColumnOrdering
      enableColumnResizing
      enableEditing
      enableGrouping
      enablePinning
      enableRowActions
      enableRowSelection
      onEditRowSubmit={handleSaveRow}
      positionToolbarAlertBanner="bottom"
      renderDetailPanel={({ row }) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <img
            alt="avatar"
            height={200}
            src={row.original.avatar}
            loading="lazy"
            style={{ borderRadius: '50%' }}
          />
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h4">Signature Catch Phrase:</Typography>
            <Typography variant="h1">
              &quot;{row.original.signatureCatchPhrase}&quot;
            </Typography>
          </div>
        </div>
      )}
      renderRowActionMenuItems={({ closeMenu }) => [
        <MenuItem
          key={0}
          onClick={() => {
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Profile
        </MenuItem>,
        <MenuItem
          key={0}
          onClick={() => {
            // Send email logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          Send Email
        </MenuItem>,
      ]}
      renderToolbarTopCustomActions={({ table }) => {
        const handleDeactivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('deactivating ' + row.original.firstName);
          });
        };

        const handleActivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('activating ' + row.original.firstName);
          });
        };

        const handleContact = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('contact ' + row.original.firstName);
          });
        };

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              color="error"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleDeactivate}
              variant="contained"
            >
              Deactivate
            </Button>
            <Button
              color="success"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleActivate}
              variant="contained"
            >
              Activate
            </Button>
            <Button
              color="info"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleContact}
              variant="contained"
            >
              Contact
            </Button>
          </div>
        );
      }}
    />
  );
};

export default Example;
