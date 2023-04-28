import React from 'react';

//Import Material React Table and its Types
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';

//Import Material React Table Translations
import { TRT_Localization_FI } from 'tailwindcss-react-table/locales/fi';

//mock data
import { data, type Person } from './makeData';

const columns: TRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Etunimi',
  },
  {
    accessorKey: 'lastName',
    header: 'Sukunimi',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Ikä',
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
      localization={TRT_Localization_FI}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { fiFI } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, fiFI)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
