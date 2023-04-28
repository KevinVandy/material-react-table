import React from 'react';

//Import TailwindCSS React Table and its Types
import TailwindCSSReactTable from 'tailwindcss-react-table';

//Import TailwindCSS React Table Translations
import { TRT_Localization_SR_CYRL_RS } from 'tailwindcss-react-table/locales/sr-Cyrl-RS';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Име',
  },
  {
    accessorKey: 'lastName',
    header: 'Презиме',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Старост',
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
      localization={TRT_Localization_SR_CYRL_RS}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { srRS } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, srRS)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
