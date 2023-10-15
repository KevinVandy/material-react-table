import { useEffect, useReducer, useRef } from 'react';
import { getCanRankRows } from '../column.utils';
import {
  type MRT_RowData,
  type MRT_SortingState,
  type MRT_TableInstance,
} from '../types';

export const useMRT_Effects = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
) => {
  const {
    getIsSomeRowsPinned,
    getState,
    options: { enablePagination, enableRowPinning, rowCount },
  } = table;
  const {
    density,
    globalFilter,
    isFullScreen,
    isLoading,
    pagination,
    showSkeletons,
    sorting,
  } = getState();

  const rerender = useReducer(() => ({}), {})[1];
  const isMounted = useRef(false);
  const initialBodyHeight = useRef<string>();
  const previousTop = useRef<number>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initialBodyHeight.current = document.body.style.height;
    }
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      if (isFullScreen) {
        previousTop.current = document.body.getBoundingClientRect().top; //save scroll position
        document.body.style.height = '100vh'; //hide page scrollbars when table is in full screen mode
      } else {
        document.body.style.height = initialBodyHeight.current as string;
        if (!previousTop.current) return;
        //restore scroll position
        window.scrollTo({
          behavior: 'instant',
          top: -1 * (previousTop.current as number),
        });
      }
    }
    isMounted.current = true;
  }, [isFullScreen]);

  //if page index is out of bounds, set it to the last page
  useEffect(() => {
    if (!enablePagination || isLoading || showSkeletons) return;
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
  }, [sorting]);

  useEffect(() => {
    if (!getCanRankRows(table)) return;
    if (globalFilter) {
      table.setSorting([]);
    } else {
      table.setSorting(() => appliedSort.current || []);
    }
  }, [globalFilter]);

  useEffect(() => {
    if (enableRowPinning && getIsSomeRowsPinned()) {
      setTimeout(() => {
        rerender();
      }, 150);
    }
  }, [density]);
};
