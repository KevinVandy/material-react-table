import { useEffect, useRef } from 'react';
import { getCanRankRows } from '../column.utils';
import { type MRT_SortingState, type MRT_TableInstance } from '../types';

export const useMRT_Effects = <TData extends Record<string, any>>(
  table: MRT_TableInstance<TData>,
) => {
  const {
    getState,
    options: { enablePagination, rowCount },
  } = table;
  const { globalFilter, isFullScreen, pagination, sorting } = getState();

  //if page index is out of bounds, set it to the last page
  useEffect(() => {
    if (!enablePagination) return;
    const { pageIndex, pageSize } = pagination;
    const totalRowCount =
      rowCount ?? table.getPrePaginationRowModel().rows.length;
    const firstVisibleRowIndex = pageIndex * pageSize;
    if (firstVisibleRowIndex > totalRowCount) {
      table.setPageIndex(Math.floor(totalRowCount / pageSize));
    }
  }, [rowCount, table.getPrePaginationRowModel().rows.length]);

  //turn off sort when global filter is looking for ranked results
  const appliedSort = useRef<MRT_SortingState>(sorting);
  useEffect(() => {
    if (sorting.length) {
      appliedSort.current = sorting;
    }
  }, sorting);

  useEffect(() => {
    if (!getCanRankRows(table)) return;
    if (globalFilter) {
      table.setSorting([]);
    } else {
      table.setSorting(() => appliedSort.current || []);
    }
  }, [globalFilter]);

  //hide page scrollbars when table is in full screen mode
  const initialBodyHeight = useRef<string>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initialBodyHeight.current = document.body.style.height;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isFullScreen) {
        document.body.style.height = '100vh';
      } else {
        document.body.style.height = initialBodyHeight.current as string;
      }
    }
  }, [isFullScreen]);
};
