import { compareItems, RankingInfo } from '@tanstack/match-sorter-utils';
import { Row, sortingFns } from '@tanstack/react-table';
import { MRT_Row } from '.';

const fuzzy = <TData extends Record<string, any> = {}>(
  rowA: Row<TData>,
  rowB: Row<TData>,
  columnId: string,
) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId] as RankingInfo,
      rowB.columnFiltersMeta[columnId] as RankingInfo,
    );
  }
  // Provide a fallback for when the item ranks are equal
  return dir === 0
    ? sortingFns.alphanumeric(rowA as Row<any>, rowB as Row<any>, columnId)
    : dir;
};

export const MRT_SortingFns = {
  ...sortingFns,
  fuzzy,
};

export const rankGlobalFuzzy = <TData extends Record<string, any> = {}>(
  rowA: MRT_Row<TData>,
  rowB: MRT_Row<TData>,
) =>
  Math.max(...Object.values(rowB.columnFiltersMeta).map((v: any) => v.rank)) -
  Math.max(...Object.values(rowA.columnFiltersMeta).map((v: any) => v.rank));
