import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import { createTheme, ThemeProvider } from '@mui/material';

const meta: Meta = {
  title: 'Styling/Theming',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.datatype.number(80),
  address: faker.location.streetAddress(),
}));

export const DefaultTheme = () => (
  <MaterialReactTable columns={columns} data={data} enableRowSelection />
);

export const CustomLightTheme = () => {
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

export const CustomDarkTheme = () => {
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
