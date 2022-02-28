import {
  UseGroupByHooks,
  UseRowSelectHooks,
  UseSortByHooks,
} from 'react-table';
import {
  MRT_Cell,
  MRT_ColumnInstance,
  MRT_ColumnInterface,
  MRT_Row,
  MRT_TableInstance,
  MRT_TableOptions,
  MRT_TableState,
} from '..';

declare module 'react-table' {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  export interface TableOptions<D extends Record<string, unknown>>
    extends MRT_TableOptions<D> {}

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseExpandedHooks<D>,
      UseGroupByHooks<D>,
      UseRowSelectHooks<D>,
      UseSortByHooks<D> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends MRT_TableInstance<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends MRT_TableState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends MRT_ColumnInterface<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends MRT_ColumnInstance<D> {}

  export interface Cell<
    D extends Record<string, unknown> = Record<string, unknown>,
    V = any,
  > extends MRT_Cell<D> {}

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends MRT_Row<D> {}
}
