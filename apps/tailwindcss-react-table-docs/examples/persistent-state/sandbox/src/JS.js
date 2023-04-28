import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import TailwindCSSReactTable from 'tailwindcss-react-table';
import { data } from './makeData';

//column definitions...
const columns = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
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
    accessorKey: 'salary',
    header: 'Salary',
  },
];
//end

const Example = () => {
  const isFirstRender = useRef(true);

  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [density, setDensity] = useState('comfortable');
  const [globalFilter, setGlobalFilter] = useState(undefined);
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [sorting, setSorting] = useState([]);

  //load state from local storage
  useEffect(() => {
    const columnFilters = sessionStorage.getItem('TRT_columnFilters_table_1');
    const columnVisibility = sessionStorage.getItem(
      'TRT_columnVisibility_table_1',
    );
    const density = sessionStorage.getItem('TRT_density_table_1');
    const globalFilter = sessionStorage.getItem('TRT_globalFilter_table_1');
    const showGlobalFilter = sessionStorage.getItem(
      'TRT_showGlobalFilter_table_1',
    );
    const showColumnFilters = sessionStorage.getItem(
      'TRT_showColumnFilters_table_1',
    );
    const sorting = sessionStorage.getItem('TRT_sorting_table_1');

    if (columnFilters) {
      setColumnFilters(JSON.parse(columnFilters));
    }
    if (columnVisibility) {
      setColumnVisibility(JSON.parse(columnVisibility));
    }
    if (density) {
      setDensity(JSON.parse(density));
    }
    if (globalFilter) {
      setGlobalFilter(JSON.parse(globalFilter) || undefined);
    }
    if (showGlobalFilter) {
      setShowGlobalFilter(JSON.parse(showGlobalFilter));
    }
    if (showColumnFilters) {
      setShowColumnFilters(JSON.parse(showColumnFilters));
    }
    if (sorting) {
      setSorting(JSON.parse(sorting));
    }
    isFirstRender.current = false;
  }, []);

  //save states to local storage
  useEffect(() => {
    if (isFirstRender.current) return;
    sessionStorage.setItem(
      'TRT_columnFilters_table_1',
      JSON.stringify(columnFilters),
    );
  }, [columnFilters]);

  useEffect(() => {
    if (isFirstRender.current) return;
    sessionStorage.setItem(
      'TRT_columnVisibility_table_1',
      JSON.stringify(columnVisibility),
    );
  }, [columnVisibility]);

  useEffect(() => {
    if (isFirstRender.current) return;
    sessionStorage.setItem('TRT_density_table_1', JSON.stringify(density));
  }, [density]);

  useEffect(() => {
    if (isFirstRender.current) return;
    sessionStorage.setItem(
      'TRT_globalFilter_table_1',
      JSON.stringify(globalFilter ?? ''),
    );
  }, [globalFilter]);

  useEffect(() => {
    if (isFirstRender.current) return;
    sessionStorage.setItem(
      'TRT_showGlobalFilter_table_1',
      JSON.stringify(showGlobalFilter),
    );
  }, [showGlobalFilter]);

  useEffect(() => {
    if (isFirstRender.current) return;
    sessionStorage.setItem(
      'TRT_showColumnFilters_table_1',
      JSON.stringify(showColumnFilters),
    );
  }, [showColumnFilters]);

  useEffect(() => {
    if (isFirstRender.current) return;
    sessionStorage.setItem('TRT_sorting_table_1', JSON.stringify(sorting));
  }, [sorting]);

  const resetState = () => {
    sessionStorage.removeItem('TRT_columnFilters_table_1');
    sessionStorage.removeItem('TRT_columnVisibility_table_1');
    sessionStorage.removeItem('TRT_density_table_1');
    sessionStorage.removeItem('TRT_globalFilter_table_1');
    sessionStorage.removeItem('TRT_showGlobalFilter_table_1');
    sessionStorage.removeItem('TRT_showColumnFilters_table_1');
    sessionStorage.removeItem('TRT_sorting_table_1');
    window.location.reload();
  };

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      onColumnFiltersChange={setColumnFilters}
      onColumnVisibilityChange={setColumnVisibility}
      onDensityChange={setDensity}
      onGlobalFilterChange={setGlobalFilter}
      onShowColumnFiltersChange={setShowColumnFilters}
      onShowGlobalFilterChange={setShowGlobalFilter}
      onSortingChange={setSorting}
      state={{
        columnFilters,
        columnVisibility,
        density,
        globalFilter,
        showColumnFilters,
        showGlobalFilter,
        sorting,
      }}
      renderTopToolbarCustomActions={() => (
        <Button onClick={resetState}>Reset State</Button>
      )}
    />
  );
};

export default Example;
