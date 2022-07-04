import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import { faker } from '@faker-js/faker';
import { MenuItem } from '@mui/material';

const meta: Meta = {
  title: 'Features/Editing Examples',
};

export default meta;

const data = [...Array(10)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const EditingEnabledEditModeRowDefault: Story<
  MaterialReactTableProps
> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = ({ row }) => {
    tableData[+row.index] = row._valuesCache;
    setTableData([...tableData]);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: false,
        },
      ]}
      data={tableData}
      enableEditing
      onEditRowSubmit={handleSaveRow}
    />
  );
};

export const EditingEnabledEditModeCell: Story<
  MaterialReactTableProps
> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveCell = ({ cell, event }) => {
    tableData[+cell.row.index][cell.column.id] = event.target.value;
    setTableData([...tableData]);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: false,
        },
      ]}
      data={tableData}
      editingMode="cell"
      enableEditing
      onCellEditBlur={handleSaveCell}
    />
  );
};

export const EditingEnabledEditModeTable: Story<
  MaterialReactTableProps
> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveCell = ({ cell, event }) => {
    tableData[+cell.row.index][cell.column.id] = event.target.value;
    setTableData([...tableData]);
    console.info('saved cell with value: ', event.target.value);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      editingMode="table"
      enableEditing
      onCellEditBlur={handleSaveCell}
    />
  );
};

export const EditingCustomizeInput: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = ({ row }) => {
    tableData[+row.index] = row._valuesCache;
    setTableData([...tableData]);
  };

  const usStates = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
          muiTableBodyCellEditTextFieldProps: () => ({
            children: usStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            )),
            select: true,
          }),
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      enableRowActions
      enableEditing
      muiTableBodyCellEditTextFieldProps={{ variant: 'outlined' }}
      onEditRowSubmit={handleSaveRow}
    />
  );
};

export const EditingWithValidation: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [firstNameError, setFirstNameError] = useState<string | boolean>(false);
  const [lastNameError, setLastNameError] = useState<string | boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<string | boolean>(
    false,
  );

  const handleSaveRow = ({ row }) => {
    tableData[+row.index] = row._valuesCache;
    setTableData([...tableData]);
  };

  const validateFirstName = (value: string) => {
    if (value.length === 0) return 'First name is required';
    return false;
  };

  const validateLastName = (value: string) => {
    if (value.length === 0) return 'Last name is required';
    return false;
  };

  const validatePhoneNumber = (value: string) => {
    if (value.length === 0) return 'Phone number is required';
    if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/))
      return 'Invalid phone number';
    return false;
  };

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
          muiTableBodyCellEditTextFieldProps: {
            error: !!firstNameError,
            helperText: firstNameError,
          },
          onCellEditChange: ({ event }) => {
            setFirstNameError(validateFirstName(event.target.value));
          },
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
          muiTableBodyCellEditTextFieldProps: {
            error: !!lastNameError,
            helperText: lastNameError,
          },
          onCellEditChange: ({ event }) => {
            setLastNameError(validateLastName(event.target.value));
          },
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          muiTableBodyCellEditTextFieldProps: {
            error: !!phoneNumberError,
            helperText: phoneNumberError,
          },
          onCellEditChange: ({ event }) => {
            setPhoneNumberError(validatePhoneNumber(event.target.value));
          },
        },
      ]}
      data={tableData}
      enableRowActions
      enableEditing
      onEditRowSubmit={handleSaveRow}
    />
  );
};

export const EditingEnabledAsync: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow = ({ row }) => {
    setIsSaving(true);
    setTimeout(() => {
      tableData[+row.index] = row._valuesCache;
      setTableData([...tableData]);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      enableRowActions
      enableEditing
      onEditRowSubmit={handleSaveRow}
      state={{
        showProgressBars: isSaving,
      }}
    />
  );
};
