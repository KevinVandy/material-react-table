import React from 'react';

//Import Material React Table and its Types
import MaterialReactTable from 'material-react-table';

//Import Material React Table Translations
import { TRT_Localization_SR_LATN_RS } from 'material-react-table/locales/sr-Latn-RS';

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
      localization={TRT_Localization_SR_LATN_RS}
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
