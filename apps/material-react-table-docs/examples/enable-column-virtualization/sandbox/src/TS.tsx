import React, { useRef } from 'react';
import MaterialReactTable, { type TRT_Virtualizer } from 'material-react-table';
import { fakeColumns, fakeData } from './makeData';

const Example = () => {
  //optionally access the underlying virtualizer instance
  const columnVirtualizerInstanceRef =
    useRef<TRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>>(null);

  return (
    <MaterialReactTable
      columnVirtualizerInstanceRef={columnVirtualizerInstanceRef} //optional
      columnVirtualizerProps={{ overscan: 4 }} //optionally customize the virtualizer
      columns={fakeColumns} //500 columns
      data={fakeData}
      enableColumnVirtualization
      enablePinning
      enableRowNumbers
    />
  );
};

export default Example;
