import { useMemo } from 'react';
import { TableInstance } from 'react-table';

export interface UseMRTCalcs {
  anyRowsCanExpand: boolean;
  anyRowsExpanded: boolean;
}

interface Props<D extends {}> {
  tableInstance: TableInstance<D>;
}

export const useMRTCalcs = <D extends {}>({
  tableInstance,
}: Props<D>): UseMRTCalcs => {
  const anyRowsCanExpand = useMemo(
    () => tableInstance.rows.some((row) => row.canExpand),
    [tableInstance.rows],
  );

  const anyRowsExpanded = useMemo(
    () => tableInstance.rows.some((row) => row.isExpanded),
    [tableInstance.rows],
  );

  return {
    anyRowsCanExpand,
    anyRowsExpanded,
  };
};
