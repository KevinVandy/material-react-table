import React from 'react';

//Import Material React Table and its Types
import TailwindCSSReactTable from 'tailwindcss-react-table';

//Import Material React Table Translations
import { TRT_Localization_PT_BR } from 'tailwindcss-react-table/locales/pt-BR';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Primeiro nome',
  },
  {
    accessorKey: 'lastName',
    header: 'Sobrenome',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Era',
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
      localization={TRT_Localization_PT_BR}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { ptBR } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, ptBR)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
