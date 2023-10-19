//Import Material React Table and its Types
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

//Import Material React Table Translations
import { MRT_Localization_PT } from 'material-react-table/locales/pt';

//mock data
import { data, type Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
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
      localization={MRT_Localization_PT}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { ptPT } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, ptPT)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
