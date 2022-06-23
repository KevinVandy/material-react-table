import React, { FC, useMemo, useState } from 'react';
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { makeData } from './makeData';

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

const Example: FC = () => {
  const columns = useMemo(
    () =>
      [
        {
          header: 'Employee',
          id: 'employee',
          columns: [
            {
              header: 'First Name',
              id: 'firstName',
              enableClickToCopy: false,
              width: 60,
            },
            {
              header: 'Last Name',
              id: 'lastName',
              enableClickToCopy: false,
              width: 60,
            },
            {
              header: 'Email',
              id: 'email',
            },
          ],
        },
        {
          header: 'Job Info',
          id: 'jobInfo',
          columns: [
            {
              header: 'Job Title',
              id: 'jobTitle',
              width: 250,
            },
            {
              header: 'Salary',
              id: 'salary',
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
              Cell: ({ cell }) =>
                (cell.getValue() as Date).toLocaleDateString(), //transform data to readable format for cell render
              Header: <em>Start Date</em>, //custom header markup
              accessorFn: (row: Employee) => new Date(row.startDate), //transform data before processing so sorting works
              header: 'Start Date',
              id: 'startDate',
              muiTableHeadCellFilterTextFieldProps: {
                type: 'date',
              },
            },
          ],
        },
      ] as MRT_ColumnDef<Employee>[],
    [],
  );

  const [employeeData, setEmployeeData] = useState(() => makeData());

  const handleSaveRow = ({ row }: { row: MRT_Row<Employee> }) => {
    employeeData[+row.index] = row._valuesCache as Employee;
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
      renderToolbarTopCustomActions={({ instance }) => {
        const handleDeactivate = () => {
          instance.getSelectedRowModel().flatRows.map((row) => {
            alert('deactivating ' + row.original.firstName);
          });
        };

        const handleActivate = () => {
          instance.getSelectedRowModel().flatRows.map((row) => {
            alert('activating ' + row.original.firstName);
          });
        };

        const handleContact = () => {
          instance.getSelectedRowModel().flatRows.map((row) => {
            alert('contact ' + row.original.firstName);
          });
        };

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              color="error"
              disabled={instance.getSelectedRowModel().flatRows.length === 0}
              onClick={handleDeactivate}
              variant="contained"
            >
              Deactivate
            </Button>
            <Button
              color="success"
              disabled={instance.getSelectedRowModel().flatRows.length === 0}
              onClick={handleActivate}
              variant="contained"
            >
              Activate
            </Button>
            <Button
              color="info"
              disabled={instance.getSelectedRowModel().flatRows.length === 0}
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
