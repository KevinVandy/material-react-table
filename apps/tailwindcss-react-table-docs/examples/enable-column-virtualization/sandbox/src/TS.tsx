import React, { useRef } from 'react';
import TailwindCSSReactTable, {
  type TRT_Virtualizer,
} from 'tailwindcss-react-table';
import { fakeColumns, fakeData } from './makeData';

const Example = () => {
  //optionally access the underlying virtualizer instance
  const columnVirtualizerInstanceRef =
    useRef<TRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>>(null);

  return (
    <TailwindCSSReactTable
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
