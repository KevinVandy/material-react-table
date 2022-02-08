import { useMemo } from 'react';
import { TableInstance } from 'react-table';

export interface UseMRTCalcs {
  anyRowsCanExpand: boolean;
  anyRowsExpanded: boolean;
  maxColumnDepth: number;
}

interface Props<D extends {}> {
  tableInstance: TableInstance<D>;
}

export const useMRTCalcs = <D extends {}>({ tableInstance }: Props<D>): UseMRTCalcs => {
  const anyRowsCanExpand = useMemo(
    () => tableInstance.rows.some((row) => row.canExpand),
    [tableInstance.rows],
  );

  const anyRowsExpanded = useMemo(
    () => tableInstance.rows.some((row) => row.isExpanded),
    [tableInstance.rows],
  );

  const maxColumnDepth = useMemo(() => {
    let maxDepth = 1;
    tableInstance.columns.forEach((column) => {
      if (column.columns?.length) {
        maxDepth = Math.max(maxDepth, column.columns.length);
      }
    });
    return maxDepth - 1;
  }, [tableInstance.columns]);

  return {
    anyRowsCanExpand,
    anyRowsExpanded,
    maxColumnDepth,
  };
};
