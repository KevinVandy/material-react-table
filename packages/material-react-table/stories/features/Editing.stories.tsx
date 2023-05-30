import { useState } from 'react';
import { type Meta } from '@storybook/react';
import {
  MaterialReactTable,
  type MRT_Cell,
  type MaterialReactTableProps,
} from '../../src';
import { faker } from '@faker-js/faker';
import MenuItem from '@mui/material/MenuItem';

const meta: Meta = {
  title: 'Features/Editing Examples',
};

export default meta;

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

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
};

const data: Person[] = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const EditingEnabledEditModeModalDefault = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
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
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingEnabledEditModeRow = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
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
      editingMode="row"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingEnabledEditModeCell = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveCell = (cell: MRT_Cell<Person>, value: any) => {
    //@ts-ignore
    tableData[cell.row.index][cell.column.id] = value;
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
      muiTableBodyCellEditTextFieldProps={({ cell }) => ({
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
      })}
    />
  );
};

export const EditingEnabledEditModeTable = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveCell = (cell: MRT_Cell<Person>, value: string) => {
    //@ts-ignore
    tableData[+cell.row.index][cell.column.id] = value;
    setTableData([...tableData]);
    console.info('saved cell with value: ', value);
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
      muiTableBodyCellEditTextFieldProps={({ cell }) => ({
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
      })}
    />
  );
};

export const EditSelectVariant = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    row,
    values,
  }) => {
    tableData[+row.index] = values;
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
          editVariant: 'select',
          editSelectOptions: usStates,
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
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditSelectVariantAlternate = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    row,
    values,
  }) => {
    tableData[row.index] = values;
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
          editVariant: 'select',
          editSelectOptions: [
            { value: 'Alabama', text: 'AL' },
            { value: 'Alaska', text: 'AK' },
            { value: 'American Samoa', text: 'AS' },
            { value: 'Arizona', text: 'AZ' },
            { value: 'Arkansas', text: 'AR' },
            { value: 'California', text: 'CA' },
            { value: 'Colorado', text: 'CO' },
            { value: 'Connecticut', text: 'CT' },
            { value: 'Delaware', text: 'DE' },
            { value: 'Florida', text: 'FL' },
            { value: 'Georgia', text: 'GA' },
            { value: 'Guam', text: 'GU' },
            { value: 'Hawaii', text: 'HI' },
            { value: 'Idaho', text: 'ID' },
            { value: 'Illinois', text: 'IL' },
            { value: 'Indiana', text: 'IN' },
            { value: 'Iowa', text: 'IA' },
            { value: 'Kansas', text: 'KS' },
            { value: 'Kentucky', text: 'KY' },
            { value: 'Louisiana', text: 'LA' },
            { value: 'Maine', text: 'ME' },
            { value: 'Maryland', text: 'MD' },
            { value: 'Massachusetts', text: 'MA' },
            { value: 'Michigan', text: 'MI' },
            { value: 'Minnesota', text: 'MN' },
            { value: 'Mississippi', text: 'MS' },
            { value: 'Missouri', text: 'MO' },
            { value: 'Montana', text: 'MT' },
            { value: 'Nebraska', text: 'NE' },
            { value: 'Nevada', text: 'NV' },
            { value: 'New Hampshire', text: 'NH' },
            { value: 'New Jersey', text: 'NJ' },
            { value: 'New Mexico', text: 'NM' },
            { value: 'New York', text: 'NY' },
            { value: 'North Carolina', text: 'NC' },
            { value: 'North Dakota', text: 'ND' },
            { value: 'Northern Mariana Islands', text: 'MP' },
            { value: 'Ohio', text: 'OH' },
            { value: 'Oklahoma', text: 'OK' },
            { value: 'Oregon', text: 'OR' },
            { value: 'Pennsylvania', text: 'PA' },
            { value: 'Puerto Rico', text: 'PR' },
            { value: 'Rhode Island', text: 'RI' },
            { value: 'South Carolina', text: 'SC' },
          ],
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      enableRowActions
      enableEditing
      editingMode="row"
      muiTableBodyCellEditTextFieldProps={{ variant: 'outlined' }}
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingCustomizeInput = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    row,
    values,
  }) => {
    tableData[row.index] = values;
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
      onEditingRowSave={handleSaveRow}
    />
  );
};

// export const EditingWithValidation = () => {
//   const [tableData, setTableData] = useState(data);
//   const [firstNameError, setFirstNameError] = useState<string | boolean>(false);
//   const [lastNameError, setLastNameError] = useState<string | boolean>(false);
//   const [phoneNumberError, setPhoneNumberError] = useState<string | boolean>(
//     false,
//   );

//   const handleSaveRow = ({ row, values }) => {
//     tableData[row.index] = values;
//     setTableData([...tableData]);
//   };

//   const validateFirstName = (value: string) => {
//     if (value.length === 0) return 'First name is required';
//     return false;
//   };

//   const validateLastName = (value: string) => {
//     if (value.length === 0) return 'Last name is required';
//     return false;
//   };

//   const validatePhoneNumber = (value: string) => {
//     if (value.length === 0) return 'Phone number is required';
//     if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/))
//       return 'Invalid phone number';
//     return false;
//   };

//   return (
//     <MaterialReactTable
//       columns={[
//         {
//           header: 'First Name',
//           accessorKey: 'firstName',
//           muiTableBodyCellEditTextFieldProps: {
//             error: !!firstNameError,
//             helperText: firstNameError,
//           },
//           onCellEditChange: ({ event }) => {
//             setFirstNameError(validateFirstName(event.target.value));
//           },
//         },
//         {
//           header: 'Last Name',
//           accessorKey: 'lastName',
//           muiTableBodyCellEditTextFieldProps: {
//             error: !!lastNameError,
//             helperText: lastNameError,
//           },
//           onCellEditChange: ({ event }) => {
//             setLastNameError(validateLastName(event.target.value));
//           },
//         },
//         {
//           header: 'Phone Number',
//           accessorKey: 'phoneNumber',
//           muiTableBodyCellEditTextFieldProps: {
//             error: !!phoneNumberError,
//             helperText: phoneNumberError,
//           },
//           onCellEditChange: ({ event }) => {
//             setPhoneNumberError(validatePhoneNumber(event.target.value));
//           },
//         },
//       ]}
//       data={tableData}
//       enableRowActions
//       enableEditing
//       onEditingRowSave={handleSaveRow}
//     />
//   );
// };

export const EditingEnabledAsync = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    row,
    values,
  }) => {
    setIsSaving(true);
    setTimeout(() => {
      tableData[row.index] = values;
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
      onEditingRowSave={handleSaveRow}
      state={{
        showProgressBars: isSaving,
      }}
    />
  );
};

const nestedData = [...Array(10)].map(() => ({
  name: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const EditingNestedData = () => {
  const [tableData, setTableData] = useState(() => nestedData);

  return (
    <MaterialReactTable
      columns={[
        {
          header: 'First Name',
          accessorFn: (row) => row.name.firstName,
          id: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'name.lastName',
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
      onEditingRowSave={({ row, values }) => {
        tableData[row.index] = {
          name: {
            firstName: values.firstName,
            lastName: values['name.lastName'],
          },
          address: row._valuesCache.address,
          state: row._valuesCache.state,
          phoneNumber: row._valuesCache.phoneNumber,
        };
        setTableData([...tableData]);
      }}
    />
  );
};

export const EditingEnabledEditModeTableWithGroupedRows = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
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
      enableGrouping
      editingMode="table"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EnableEditingConditionally = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
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
          enableEditing: (row) => row.original.state.includes('N'),
        },
      ]}
      data={tableData}
      enableEditing={(row) => row.index % 2 === 0}
      editingMode="row"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EnableEditingConditionallyCell = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
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
          enableEditing: (row) => row.original.state.includes('N'),
        },
      ]}
      data={tableData}
      enableEditing={(row) => row.index % 2 === 0}
      editingMode="cell"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EnableEditingConditionallyTable = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
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
          enableEditing: (row) => row.original.state.includes('N'),
        },
      ]}
      data={tableData}
      enableEditing={(row) => row.index % 2 === 0}
      editingMode="table"
      onEditingRowSave={handleSaveRow}
    />
  );
};
