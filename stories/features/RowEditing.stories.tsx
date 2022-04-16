import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { MenuItem } from '@mui/material';

const meta: Meta = {
  title: 'Features/Row Editing Examples',
  parameters: {
    status: {
      type: 'beta',
    },
  },
};

export default meta;

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const RowEditingEnabled: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          id: 'firstName',
        },
        {
          header: 'Last Name',
          id: 'lastName',
        },
        {
          header: 'Address',
          id: 'address',
        },
        {
          header: 'State',
          id: 'state',
        },
        {
          header: 'Phone Number',
          id: 'phoneNumber',
          enableEditing: false,
        },
      ]}
      data={tableData}
      enableRowActions
      enableRowEditing
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingCustomizeInput: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
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
          id: 'firstName',
        },
        {
          header: 'Last Name',
          id: 'lastName',
        },
        {
          header: 'Address',
          id: 'address',
        },
        {
          header: 'State',
          id: 'state',
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            children: usStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            )),
            select: true,
            value: cell.value,
          }),
        },
        {
          header: 'Phone Number',
          id: 'phoneNumber',
        },
      ]}
      data={tableData}
      enableRowActions
      enableRowEditing
      muiTableBodyCellEditTextFieldProps={{ variant: 'outlined' }}
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingWithValidation: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [firstNameError, setFirstNameError] = useState<string | boolean>(false);
  const [lastNameError, setLastNameError] = useState<string | boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<string | boolean>(
    false,
  );

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
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
          id: 'firstName',
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
          id: 'lastName',
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
          id: 'phoneNumber',
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
      // onSaveRow={handleSaveRow}
      enableRowActions
      enableRowEditing
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingEnabledAsync: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow = async (row) => {
    setIsSaving(true);
    await setTimeout(() => {
      tableData[+row.index] = row.values;
      setTableData([...tableData]);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          id: 'firstName',
        },
        {
          header: 'Last Name',
          id: 'lastName',
        },
        {
          header: 'Address',
          id: 'address',
        },
        {
          header: 'State',
          id: 'state',
        },
        {
          header: 'Phone Number',
          id: 'phoneNumber',
        },
      ]}
      data={tableData}
      enableRowActions
      enableRowEditing
      isReloading={isSaving}
      onRowEditSubmit={handleSaveRow}
    />
  );
};
