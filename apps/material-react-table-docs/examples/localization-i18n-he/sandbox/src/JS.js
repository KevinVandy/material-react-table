//Import Material React Table and its Types
import { MaterialReactTable } from 'material-react-table';

//Import Material React Table Translations
import { MRT_Localization_HE } from 'material-react-table/locales/he';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'שם פרטי',
  },
  {
    accessorKey: 'lastName',
    header: 'שם משפחה',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'גיל',
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
      localization={MRT_Localization_HE}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { heIL } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme

  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme({ ...theme, direction: 'rtl' }, heIL)}>
      <div style={{ direction: 'rtl' }}>
        <Example />
      </div>
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
