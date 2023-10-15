import { MRT_TablePaper } from './table/MRT_TablePaper';
import {
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_TableOptions,
  type Xor,
} from './types';
import { useMaterialReactTable } from './useMaterialReactTable';

type TableInstanceProp<TData extends MRT_RowData> = {
  table: MRT_TableInstance<TData>;
};

type Props<TData extends MRT_RowData> = Xor<
  TableInstanceProp<TData>,
  MRT_TableOptions<TData>
>;

const isTableInstanceProp = <TData extends MRT_RowData>(
  props: Props<TData>,
): props is TableInstanceProp<TData> =>
  (props as TableInstanceProp<TData>).table !== undefined;

export const MaterialReactTable = <TData extends MRT_RowData>(
  props: Props<TData>,
) => {
  let table: MRT_TableInstance<TData>;

  if (isTableInstanceProp(props)) {
    table = props.table;
  } else {
    table = useMaterialReactTable(props);
  }

  return <MRT_TablePaper table={table} />;
};
