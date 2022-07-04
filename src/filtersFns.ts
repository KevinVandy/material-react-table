import { rankItem, rankings, RankingInfo } from '@tanstack/match-sorter-utils';
import { filterFns, Row } from '@tanstack/react-table';

export const fuzzy = <D extends Record<string, any> = {}>(
  row: Row<D>,
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

export const contains = <D extends Record<string, any> = {}>(
  row: Row<D>,
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

export const startsWith = <D extends Record<string, any> = {}>(
  row: Row<D>,
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

export const endsWith = <D extends Record<string, any> = {}>(
  row: Row<D>,
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

export const equals = <D extends Record<string, any> = {}>(
  row: Row<D>,
  id: string,
  filterValue: string | number,
) =>
  row.getValue(id).toString().toLowerCase().trim() ===
  filterValue.toString().toLowerCase().trim();

equals.autoRemove = (val: any) => !val;

export const notEquals = <D extends Record<string, any> = {}>(
  row: Row<D>,
  id: string,
  filterValue: string | number,
) =>
  row.getValue(id).toString().toLowerCase().trim() !==
  filterValue.toString().toLowerCase().trim();

notEquals.autoRemove = (val: any) => !val;

export const greaterThan = <D extends Record<string, any> = {}>(
  row: Row<D>,
  id: string,
  filterValue: string | number,
) =>
  !isNaN(+filterValue) && !isNaN(+row.getValue(id))
    ? +row.getValue(id) >= +filterValue
    : row.getValue(id).toString().toLowerCase().trim() >
      filterValue.toString().toLowerCase().trim();

greaterThan.autoRemove = (val: any) => !val;

export const lessThan = <D extends Record<string, any> = {}>(
  row: Row<D>,
  id: string,
  filterValue: string | number,
) =>
  !isNaN(+filterValue) && !isNaN(+row.getValue(id))
    ? +row.getValue(id) <= +filterValue
    : row.getValue(id).toString().toLowerCase().trim() <
      filterValue.toString().toLowerCase().trim();

lessThan.autoRemove = (val: any) => !val;

export const between = <D extends Record<string, any> = {}>(
  row: Row<D>,
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

export const empty = <D extends Record<string, any> = {}>(
  row: Row<D>,
  id: string,
  _filterValue: string | number,
) => !row.getValue(id).toString().trim();

empty.autoRemove = (val: any) => !val;

export const notEmpty = <D extends Record<string, any> = {}>(
  row: Row<D>,
  id: string,
  _filterValue: string | number,
) => !!row.getValue(id).toString().trim();

notEmpty.autoRemove = (val: any) => !val;

export const MRT_FilterFns = {
  ...filterFns,
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
