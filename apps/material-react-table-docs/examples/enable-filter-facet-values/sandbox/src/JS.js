import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text', // default
        size: 100,
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        Cell: ({ cell }) =>
          cell.getValue().toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive', // default (or between)
        muiTableHeadCellFilterSliderProps: {
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

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableFacetedValues
      initialState={{ showColumnFilters: true }}
    />
  );
};

export default Example;
