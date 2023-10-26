import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'autocomplete', // default
        size: 100,
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive', // default (or between)
        muiFilterSliderProps: {
          //no need to specify min/max/step if using faceted values
          marks: true,
          step: 5_000,
          valueLabelFormat: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
        },
      },
      {
        accessorKey: 'city',
        header: 'City',
        filterVariant: 'select',
        //no need to specify filterSelectOptions if using faceted values
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterVariant: 'multi-select',
        //no need to specify filterSelectOptions if using faceted values
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableFacetedValues: true,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
