import React from 'react';

//Import TailwindCSS React Table and its Types
import TailwindCSSReactTable from 'tailwindcss-react-table';

//Import TailwindCSS React Table Translations
import { TRT_Localization_NL } from 'tailwindcss-react-table/locales/nl';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Voornaam',
  },
  {
    accessorKey: 'lastName',
    header: 'Achternaam',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Leeftijd',
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
      localization={TRT_Localization_NL}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { nlNL } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, nlNL)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
