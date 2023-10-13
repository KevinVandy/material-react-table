import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { columns, data } from './makeData';

const Example = () => {
  const table = useMaterialReactTable({
    columns,
    data,
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
