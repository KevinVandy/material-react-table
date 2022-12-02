import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef } from 'material-react-table';
import { faker } from '@faker-js/faker';
import { createTheme, ThemeProvider } from '@mui/material';

const meta: Meta = {
  title: 'Styling/Theming',
};

export default meta;

const columns: MRT_ColumnDef<typeof data[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
];

const data = [...Array(21)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const DefaultTheme: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableRowSelection />
);

export const CustomLightTheme: Story<MaterialReactTableProps> = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff9800',
      },
      background: {
        default: '#ffffef',
      },
      secondary: {
        main: '#00bcd4',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable columns={columns} data={data} enableRowSelection />
    </ThemeProvider>
  );
};

export const CustomDarkTheme: Story<MaterialReactTableProps> = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#81980f',
      },
      secondary: {
        main: '#00bcd4',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable columns={columns} data={data} enableRowSelection />
    </ThemeProvider>
  );
};
