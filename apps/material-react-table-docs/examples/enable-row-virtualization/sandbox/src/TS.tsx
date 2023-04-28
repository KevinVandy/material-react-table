import React, { useEffect, useMemo, useRef, useState } from 'react';
import MaterialReactTable, {
  type TRT_ColumnDef,
  type TRT_SortingState,
  type TRT_Virtualizer,
} from 'material-react-table';
import { makeData, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<TRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
        size: 150,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 300,
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'zipCode',
        header: 'Zip Code',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'country',
        header: 'Country',
      },
    ],
    [],
    //end
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef =
    useRef<TRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<TRT_SortingState>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(10_000));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data} //10,000 rows
      enableBottomToolbar={false}
      enableGlobalFilterModes
      enablePagination={false}
      enableRowNumbers
      enableRowVirtualization
      muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
      onSortingChange={setSorting}
      state={{ isLoading, sorting }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
      rowVirtualizerProps={{ overscan: 8 }} //optionally customize the virtualizer
    />
  );
};

//virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
//virtualizerProps was renamed to rowVirtualizerProps in v1.5.0

export default Example;
