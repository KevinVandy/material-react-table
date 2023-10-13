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
      showRowsPerPage: false,
      shape: 'rounded',
    },
    paginationDisplayMode: 'pages',
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
