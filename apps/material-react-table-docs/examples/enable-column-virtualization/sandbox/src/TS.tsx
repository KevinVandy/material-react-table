import { useRef } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Virtualizer,
} from 'material-react-table';
import { fakeColumns, fakeData } from './makeData';

const Example = () => {
  //optionally access the underlying virtualizer instance
  const columnVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>>(null);

  const table = useMaterialReactTable({
    columnVirtualizerInstanceRef, //optional
    columnVirtualizerOptions: { overscan: 4 }, //optionally customize the virtualizer
    columns: fakeColumns, //500 columns
    data: fakeData,
    enableColumnVirtualization: true,
    enableColumnPinning: true,
    enableRowNumbers: true,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
