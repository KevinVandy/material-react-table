import React from 'react';

//Import Material React Table and its Types
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';

//Import Material React Table Translations
import { MRT_Localization_SK } from 'material-react-table/locales/sk';

//mock data
import { data, type Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Meno',
  },
  {
    accessorKey: 'lastName',
    header: 'Priezvisko',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Vek',
  },
  //end
];

const Example = () => {
  return (
    <MaterialReactTable
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
      localization={MRT_Localization_SK}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { skSK } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, skSK)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
