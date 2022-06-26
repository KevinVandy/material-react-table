import { rankItem, rankings, RankingInfo } from '@tanstack/match-sorter-utils';
import { MRT_Row } from '.';

export const fuzzy = (
  row: MRT_Row,
  columnId: string,
  filterValue: string,
  addMeta: (item: RankingInfo) => void,
) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue, {
    threshold: rankings.MATCHES,
  });
  addMeta(itemRank);
  return itemRank.passed;
};

fuzzy.autoRemove = (val: any) => !val;

export const contains = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  row
    .getValue(id)
    .toString()
    .toLowerCase()
    .trim()
    .includes(filterValue.toString().toLowerCase().trim());

contains.autoRemove = (val: any) => !val;

export const startsWith = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  row
    .getValue(id)
    .toString()
    .toLowerCase()
    .trim()
    .startsWith(filterValue.toString().toLowerCase().trim());

startsWith.autoRemove = (val: any) => !val;

export const endsWith = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  row
    .getValue(id)
    .toString()
    .toLowerCase()
    .trim()
    .endsWith(filterValue.toString().toLowerCase().trim());

endsWith.autoRemove = (val: any) => !val;

export const equals = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  row.getValue(id).toString().toLowerCase().trim() ===
  filterValue.toString().toLowerCase().trim();

equals.autoRemove = (val: any) => !val;

export const notEquals = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  row.getValue(id).toString().toLowerCase().trim() !==
  filterValue.toString().toLowerCase().trim();

notEquals.autoRemove = (val: any) => !val;

export const greaterThan = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  !isNaN(+filterValue) && !isNaN(+row.getValue(id))
    ? +row.getValue(id) >= +filterValue
    : row.getValue(id).toString().toLowerCase().trim() >
      filterValue.toString().toLowerCase().trim();

greaterThan.autoRemove = (val: any) => !val;

export const lessThan = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  !isNaN(+filterValue) && !isNaN(+row.getValue(id))
    ? +row.getValue(id) <= +filterValue
    : row.getValue(id).toString().toLowerCase().trim() <
      filterValue.toString().toLowerCase().trim();

lessThan.autoRemove = (val: any) => !val;

export const between = (
  row: MRT_Row,
  id: string,
  filterValues: [string | number, string | number],
) =>
  ((['', undefined] as any[]).includes(filterValues[0]) ||
    greaterThan(row, id, filterValues[0])) &&
  ((!isNaN(+filterValues[0]) &&
    !isNaN(+filterValues[1]) &&
    +filterValues[0] > +filterValues[1]) ||
    (['', undefined] as any[]).includes(filterValues[1]) ||
    lessThan(row, id, filterValues[1]));

between.autoRemove = (val: any) => !val;

export const empty = (
  row: MRT_Row,
  id: string,
  _filterValue: string | number,
) => !row.getValue(id).toString().trim();

empty.autoRemove = (val: any) => !val;

export const notEmpty = (
  row: MRT_Row,
  id: string,
  _filterValue: string | number,
) => !!row.getValue(id).toString().trim();

notEmpty.autoRemove = (val: any) => !val;

export const MRT_FilterFns = {
  between,
  contains,
  empty,
  endsWith,
  equals,
  fuzzy,
  greaterThan,
  lessThan,
  notEmpty,
  notEquals,
  startsWith,
};
