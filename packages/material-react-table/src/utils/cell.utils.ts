import {
  type MRT_Cell,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from './utils';

export const isCellEditable = <TData extends MRT_RowData>({
  cell,
  table,
}: {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}) => {
  const { enableEditing } = table.options;
  const {
    column: { columnDef },
    row,
  } = cell;
  return (
    !cell.getIsPlaceholder() &&
    parseFromValuesOrFunc(enableEditing, row) &&
    parseFromValuesOrFunc(columnDef.enableEditing, row) !== false
  );
};

export const openEditingCell = <TData extends MRT_RowData>({
  cell,
  table,
}: {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}) => {
  const {
    options: { editDisplayMode },
    refs: { editInputRefs },
  } = table;
  const { column } = cell;

  if (isCellEditable({ cell, table }) && editDisplayMode === 'cell') {
    table.setEditingCell(cell);
    queueMicrotask(() => {
      const textField = editInputRefs.current[column.id];
      if (textField) {
        textField.focus();
        textField.select?.();
      }
    });
  }
};
