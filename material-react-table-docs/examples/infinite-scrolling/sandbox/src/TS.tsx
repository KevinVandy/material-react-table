import React, {
  FC,
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Typography } from '@mui/material';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';

type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalRowCount: number;
  };
};

type User = {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
};

const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const fetchSize = 25;

const Example: FC = () => {
  const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const [totalRowCount, setTotalRowCount] = useState(0);
  const [numRowsFetched, setNumRowsFetched] = useState(0);

  const { data, fetchNextPage, isError, isLoading, remove, isFetching } =
    useInfiniteQuery<UserApiResponse>(
      ['table-data', columnFilters, globalFilter, sorting],
      async () => {
        const url = new URL(
          '/api/data',
          'https://www.material-react-table.com',
        );
        url.searchParams.set('start', `${numRowsFetched}`);
        url.searchParams.set('size', `${fetchSize}`);
        url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
        url.searchParams.set('globalFilter', globalFilter ?? '');
        url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

        const { data: axiosData } = await axios.get(url.href);
        return axiosData;
      },
      {
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        onSuccess: (data) => {
          setTotalRowCount(data.pages[0].meta.totalRowCount); //get and store total row count from API so we will know when to stop fetching
          setNumRowsFetched(
            (data?.pages.flatMap((page) => page.data) ?? []).length, //record how many rows we have fetched so far
          );
        },
        refetchOnWindowFocus: false,
      },
    );

  useEffect(() => {
    if (columnFilters.length) {
      remove();
      setNumRowsFetched(0);
    }
  }, [columnFilters, remove]);

  useEffect(() => {
    if (sorting.length) {
      remove();
      setNumRowsFetched(0);
    }
  }, [sorting, remove]);

  useEffect(() => {
    if (globalFilter?.length) {
      remove();
      setNumRowsFetched(0);
    }
  }, [globalFilter, remove]);

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRef?: HTMLDivElement | null) => {
      if (containerRef) {
        const { scrollHeight, scrollTop, clientHeight } = containerRef;
        //once the user has scrolled within 100px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 100 &&
          !isFetching &&
          numRowsFetched < totalRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, numRowsFetched, totalRowCount],
  );

  //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={flatData}
      enablePagination={false}
      enableRowNumbers
      enableRowVirtualization
      manualFiltering
      manualSorting
      muiTableContainerProps={{
        ref: tableContainerRef, //get access to the table container element
        sx: { maxHeight: '600px' }, //give the table a max height
        onScroll: (
          event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
        ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
      }}
      muiTableToolbarAlertBannerProps={
        isError
          ? {
              color: 'error',
              children: 'Error loading data',
            }
          : undefined
      }
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onSortingChange={setSorting}
      renderBottomToolbarCustomActions={() => (
        <Typography>
          Fetched {flatData.length} of {totalRowCount} total rows.
        </Typography>
      )}
      state={{
        columnFilters,
        globalFilter,
        isLoading,
        showAlertBanner: isError,
        showProgressBars: isFetching,
        sorting,
      }}
    />
  );
};

const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;
