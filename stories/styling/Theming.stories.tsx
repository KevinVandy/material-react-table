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
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Age',
    accessor: 'age' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
];
const data = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const DefaultTheme: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableSelection />
);

export const CustomLightTheme: Story<MaterialReactTableProps> = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff9800',
      },
      background: {
        paper: '#ffffef',
      },
      secondary: {
        main: '#00bcd4',
      },
    },
  });
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={data} enableSelection />
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
        <MaterialReactTable columns={columns} data={data} enableSelection />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};
