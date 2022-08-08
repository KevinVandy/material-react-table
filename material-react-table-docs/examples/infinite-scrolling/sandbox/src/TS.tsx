import React, { FC, UIEvent, useCallback, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { debounce, Typography } from '@mui/material';

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
] as MRT_ColumnDef<User>[];

const fetchSize = 25;

const Example: FC = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const { data, fetchNextPage, isError, isLoading } =
    useInfiniteQuery<UserApiResponse>(
      ['table-data', columnFilters, globalFilter, sorting],
      async () => {
        const url = new URL(
          '/api/data',
          'https://www.material-react-table.com',
        );
        url.searchParams.set('start', `${flatData.length || 0}`);
        url.searchParams.set('size', `${fetchSize}`);
        url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
        url.searchParams.set('globalFilter', globalFilter ?? '');
        url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

        const { data: axiosData } = await axios.get(url.href);
        return axiosData;
      },
      {
        getNextPageParam: (_lastGroup, groups) => groups.length,
        onSuccess: (data) => {
          setIsFetching(false);
          setTotalRowCount(data.pages[0].meta.totalRowCount);
        },
      },
    );

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchNextPageDebounced = useCallback(
    debounce(() => {
      if ((flatData.length ?? 0) < totalRowCount) {
        fetchNextPage();
      }
    }, 500),
    [flatData.length, totalRowCount],
  );

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } =
      event.target as HTMLDivElement;
    if (
      scrollHeight - scrollTop - clientHeight < 20 &&
      !isFetching &&
      flatData.length < totalRowCount
    ) {
      setIsFetching(true);
      fetchNextPageDebounced();
    }
  };

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
        sx: { maxHeight: '600px' },
        onScroll,
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
      rowCount={totalRowCount}
      state={{
        columnFilters,
        globalFilter,
        isLoading,
        showAlertBanner: isError,
        showProgressBars: isFetching,
        sorting,
      }}
      virtualizerProps={{
        overscan: 5,
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
