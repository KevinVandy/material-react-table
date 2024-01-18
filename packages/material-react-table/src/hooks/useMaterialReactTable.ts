import {
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_TableOptions,
} from '../types';
import { useMRT_TableInstance } from './useMRT_TableInstance';
import { useMRT_TableOptions } from './useMRT_TableOptions';

export const useMaterialReactTable = <TData extends MRT_RowData>(
  tableOptions: MRT_TableOptions<TData>,
): MRT_TableInstance<TData> =>
  useMRT_TableInstance(useMRT_TableOptions(tableOptions));
