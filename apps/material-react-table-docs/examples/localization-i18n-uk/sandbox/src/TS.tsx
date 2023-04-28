import React from 'react';

//Import Material React Table and its Types
import MaterialReactTable, { type TRT_ColumnDef } from 'material-react-table';

//Import Material React Table Translations
import { TRT_Localization_UK } from 'material-react-table/locales/uk';

//mock data
import { data, type Person } from './makeData';

const columns: TRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: "Ім'я",
  },
  {
    accessorKey: 'lastName',
    header: 'Прізвище',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Вік',
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
      localization={TRT_Localization_UK}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { ukUA } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, ukUA)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
