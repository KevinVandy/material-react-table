import React from 'react';

//Import TailwindCSS React Table and its Types
import TailwindCSSReactTable from 'tailwindcss-react-table';

//Import TailwindCSS React Table Translations
import { TRT_Localization_PL } from 'tailwindcss-react-table/locales/pl';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Imię',
  },
  {
    accessorKey: 'lastName',
    header: 'Nazwisko',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Wiek',
  },
  //end
];

const Example = () => {
  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableEditing
      enablePinning
      enableRowActions
      enableRowSelection
      enableSelectAll={false}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={TRT_Localization_PL}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { plPL } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, plPL)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
