import React from 'react';

//Import Material React Table and its Types
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';

//Import Material React Table Translations
import { TRT_Localization_RO } from 'tailwindcss-react-table/locales/ro';

//mock data
import { data, type Person } from './makeData';

const columns: TRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Nume',
  },
  {
    accessorKey: 'lastName',
    header: 'Numele de familie',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Vârstă',
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
      localization={TRT_Localization_RO}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { roRO } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, roRO)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
