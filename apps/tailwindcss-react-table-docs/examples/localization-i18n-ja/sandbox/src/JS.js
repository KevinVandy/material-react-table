import React from 'react';

//Import Material React Table and its Types
import TailwindCSSReactTable from 'tailwindcss-react-table';

//Import Material React Table Translations
import { TRT_Localization_JA } from 'tailwindcss-react-table/locales/ja';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'ファーストネーム',
  },
  {
    accessorKey: 'lastName',
    header: '苗字',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: '年',
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
      localization={TRT_Localization_JA}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { jaJP } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, jaJP)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
