import React, { FC, useRef } from 'react';
import MaterialReactTable from 'material-react-table';
import type { Virtualizer } from '@tanstack/react-virtual';
import { fakeColumns, fakeData } from './makeData';

const Example: FC = () => {
  //optionally access the underlying virtualizer instance
  const columnVirtualizerInstanceRef =
    useRef<Virtualizer<HTMLDivElement, HTMLTableCellElement>>(null);

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
