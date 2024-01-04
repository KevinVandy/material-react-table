import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { citiesList, data, type Person, usStateList } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        header: 'Status',
        accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'), //must be strings
        id: 'isActive',
        filterVariant: 'checkbox',
        Cell: ({ cell }) =>
          cell.getValue() === 'true' ? 'Active' : 'Inactive',
        size: 170,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text', // default
        size: 200,
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
          marks: true,
          max: 200_000, //custom max (as opposed to faceted max)
          min: 30_000, //custom min (as opposed to faceted min)
          step: 10_000,
          valueLabelFormat: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
        },
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
        filterFn: 'between',
        size: 80,
      },
      {
        accessorKey: 'city',
        header: 'City',
        filterVariant: 'select',
        filterSelectOptions: citiesList, //custom options list (as opposed to faceted list)
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterVariant: 'multi-select',
        filterSelectOptions: usStateList, //custom options list (as opposed to faceted list)
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.hireDate), //convert to date for sorting and filtering
        id: 'hireDate',
        header: 'Hire Date',
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), // convert back to string for display
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.arrivalTime), //convert to date for sorting and filtering
        id: 'arrivalTime',
        header: 'Arrival Time',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`, // convert back to string for display
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.departureTime), //convert to date for sorting and filtering
        id: 'departureTime',
        header: 'Departure Time',
        filterVariant: 'time-range',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleTimeString(), // convert back to string for display
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ExampleWithLocalizationProvider = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;
