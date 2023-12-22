//Import Material React Table and its Types
import { MaterialReactTable } from 'material-react-table';

//Import Material React Table Translations
import { MRT_Localization_FA } from 'material-react-table/locales/fa';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'نام',
  },
  {
    accessorKey: 'lastName',
    header: 'نام خانوادگی',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'سن',
  },
  //end
];

const Example = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      defaultColumn={{ size: 250 }}
      columnResizeDirection="rtl"
      enableColumnFilterModes
      enableColumnResizing
      enableColumnOrdering
      enableEditing
      enableColumnPinning
      enableRowActions
      enableRowSelection
      enableSelectAll={false}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={MRT_Localization_FA}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { faIR } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme({ ...theme, direction: 'rtl' }, faIR)}>
      <div style={{ direction: 'rtl' }}>
        <Example />
      </div>
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
