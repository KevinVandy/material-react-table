import { useMemo } from 'react';
import { TableInstance } from 'react-table';

export interface UseMRTCalcs {
  anyRowsCanExpand: boolean;
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

  return { anyRowsCanExpand };
};
