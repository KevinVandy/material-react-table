import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { createTheme, ThemeProvider } from '@mui/material';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

const meta: Meta = {
  title: 'Styling/Theming',
};

export default meta;

const columns = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
  },
  {
    header: 'Age',
    id: 'age',
  },
  {
    header: 'Address',
    id: 'address',
  },
];
const data = [...Array(21)].map((_) => ({
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
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={data} enableRowSelection />
      </ThemeProvider>
    </Emotion10ThemeProvider>
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
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={data} enableRowSelection />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};
