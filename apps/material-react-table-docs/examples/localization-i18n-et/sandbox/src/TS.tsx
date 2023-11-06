//Import Material React Table and its Types
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

//Import Material React Table Translations
import { MRT_Localization_ET } from 'material-react-table/locales/et';

//mock data
import { data, type Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Eesnimi',
  },
  {
    accessorKey: 'lastName',
    header: 'Perekonnanimi',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Vanus',
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
      enableColumnPinning
      enableRowActions
      enableRowSelection
      enableSelectAll={false}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={MRT_Localization_ET}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { etEE } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, etEE)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
