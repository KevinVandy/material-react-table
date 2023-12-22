//Import Material React Table and its Types
import { MaterialReactTable } from 'material-react-table';

//Import Material React Table Translations
import { MRT_Localization_HY } from 'material-react-table/src/locales/hy';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Անուն',
  },
  {
    accessorKey: 'lastName',
    header: 'Ազգանուն',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Տարիք',
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
      enableColumnOrdering
      enableColumnResizing
      enableEditing
      enableColumnPinning
      enableRowActions
      enableRowSelection
      enableSelectAll={false}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={MRT_Localization_HY}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { hyAM } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme({ ...theme, direction: 'rtl' }, hyAM)}>
      <div style={{ direction: 'rtl' }}>
        <Example />
      </div>
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
