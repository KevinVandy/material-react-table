import { matchSorter } from 'match-sorter';
import { MRT_Row } from '.';

export const fuzzy = (
  rows: MRT_Row[],
  columnIds: string[] | string,
  filterValue: string | number,
) =>
  matchSorter(rows, filterValue.toString().trim(), {
    keys: Array.isArray(columnIds)
      ? columnIds.map((c) => `values.${c}`)
      : [`values.${columnIds}`],
    sorter: (rankedItems) => rankedItems,
  });

fuzzy.autoRemove = (val: any) => !val;

export const contains = (
  rows: MRT_Row[],
  id: string,
  filterValue: string | number,
) =>
  rows.filter((row) =>
    row.values[id]
      .toString()
      .toLowerCase()
      .trim()
      .includes(filterValue.toString().toLowerCase().trim()),
  );

contains.autoRemove = (val: any) => !val;

export const startsWith = (
  rows: MRT_Row[],
  id: string,
  filterValue: string | number,
) =>
  rows.filter((row) =>
    row.values[id]
      .toString()
      .toLowerCase()
      .trim()
      .startsWith(filterValue.toString().toLowerCase().trim()),
  );

startsWith.autoRemove = (val: any) => !val;

export const endsWith = (
  rows: MRT_Row[],
  id: string,
  filterValue: string | number,
) =>
  rows.filter((row) =>
    row.values[id]
      .toString()
      .toLowerCase()
      .trim()
      .endsWith(filterValue.toString().toLowerCase().trim()),
  );

endsWith.autoRemove = (val: any) => !val;

export const equals = (
  rows: MRT_Row[],
  id: string,
  filterValue: string | number,
) =>
  rows.filter(
    (row) =>
      row.values[id].toString().toLowerCase().trim() ===
      filterValue.toString().toLowerCase().trim(),
  );

equals.autoRemove = (val: any) => !val;

export const notEquals = (
  rows: MRT_Row[],
  id: string,
  filterValue: string | number,
) =>
  rows.filter(
    (row) =>
      row.values[id].toString().toLowerCase().trim() !==
      filterValue.toString().toLowerCase().trim(),
  );

notEquals.autoRemove = (val: any) => !val;

export const greaterThan = (
  rows: MRT_Row[],
  id: string,
  filterValue: string | number,
) =>
  rows.filter((row) =>
    !isNaN(+filterValue) && !isNaN(+row.values[id])
      ? +row.values[id] > +filterValue
      : row.values[id].toString().toLowerCase().trim() >
        filterValue.toString().toLowerCase().trim(),
  );

greaterThan.autoRemove = (val: any) => !val;

export const lessThan = (
  rows: MRT_Row[],
  id: string,
  filterValue: string | number,
) =>
  rows.filter((row) =>
    !isNaN(+filterValue) && !isNaN(+row.values[id])
      ? +row.values[id] < +filterValue
      : row.values[id].toString().toLowerCase().trim() <
        filterValue.toString().toLowerCase().trim(),
  );

lessThan.autoRemove = (val: any) => !val;

export const empty = (
  rows: MRT_Row[],
  id: string,
  _filterValue: string | number,
) => rows.filter((row) => !row.values[id].toString().toLowerCase().trim());

empty.autoRemove = (val: any) => !val;

export const notEmpty = (
  rows: MRT_Row[],
  id: string,
  _filterValue: string | number,
) => rows.filter((row) => !!row.values[id].toString().toLowerCase().trim());

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
