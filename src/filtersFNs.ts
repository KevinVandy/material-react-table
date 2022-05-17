import { rankItem, rankings, RankingInfo } from '@tanstack/match-sorter-utils';
import { MRT_Row } from '.';

export const fuzzy = (
  row: MRT_Row,
  columnId: string,
  value: string,
  addMeta: (item: RankingInfo) => void,
) => {
  const itemRank = rankItem(row.getValue(columnId), value, {
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
  row.valuesCache[id]
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
  row.valuesCache[id]
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
  row.valuesCache[id]
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
  row.valuesCache[id].toString().toLowerCase().trim() ===
  filterValue.toString().toLowerCase().trim();

equals.autoRemove = (val: any) => !val;

export const notEquals = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  row.valuesCache[id].toString().toLowerCase().trim() !==
  filterValue.toString().toLowerCase().trim();

notEquals.autoRemove = (val: any) => !val;

export const greaterThan = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  !isNaN(+filterValue) && !isNaN(+row.valuesCache[id])
    ? +row.valuesCache[id] > +filterValue
    : row.valuesCache[id].toString().toLowerCase().trim() >
      filterValue.toString().toLowerCase().trim();

greaterThan.autoRemove = (val: any) => !val;

export const lessThan = (
  row: MRT_Row,
  id: string,
  filterValue: string | number,
) =>
  !isNaN(+filterValue) && !isNaN(+row.valuesCache[id])
    ? +row.valuesCache[id] < +filterValue
    : row.valuesCache[id].toString().toLowerCase().trim() <
      filterValue.toString().toLowerCase().trim();

lessThan.autoRemove = (val: any) => !val;

export const empty = (
  row: MRT_Row,
  id: string,
  _filterValue: string | number,
) => !row.valuesCache[id].toString().toLowerCase().trim();

empty.autoRemove = (val: any) => !val;

export const notEmpty = (
  row: MRT_Row,
  id: string,
  _filterValue: string | number,
) => !!row.valuesCache[id].toString().toLowerCase().trim();

notEmpty.autoRemove = (val: any) => !val;

export const defaultFilterFNs = {
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
