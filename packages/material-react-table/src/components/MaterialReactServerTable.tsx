import { useEffect, useState } from 'react';
import {
  type MRT_RowData,
  type MRT_TableConfig,
  type MRT_TableData,
  type MRT_TableState,
} from '../types';
import { MaterialReactServerTableInstance } from './MaterialReactServerTableInstance';

export interface MaterialReactServerTableProps<TData extends MRT_RowData> {
  loadConfig: () => Promise<MRT_TableConfig<TData>>;
  loadData: (
    currentState: MRT_TableState<TData>,
  ) => Promise<MRT_TableData<TData>>;
  saveState: (state: MRT_TableState<TData>) => Promise<void>;
}

export const MaterialReactServerTable = <TData extends MRT_RowData>({
  loadConfig,
  loadData,
  saveState,
}: MaterialReactServerTableProps<TData>) => {
  const [configLoading, setConfigLoading] = useState(true);
  const [config, setConfig] = useState<MRT_TableConfig<TData> | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTableConfig = async () => {
      try {
        const loadedConfig = await loadConfig();
        if (!isMounted) return;
        setConfig(loadedConfig);
      } catch {
        if (!isMounted) return;
        setConfig(null);
      } finally {
        if (!isMounted) return;
        setConfigLoading(false);
      }
    };

    void loadTableConfig();

    return () => {
      isMounted = false;
    };
  }, [loadConfig]);

  if (configLoading) {
    return <div>Loading...</div>;
  }

  if (!config) {
    return <div>Error loading table configuration.</div>;
  }

  return (
    <MaterialReactServerTableInstance<TData>
      config={config}
      loadData={loadData}
      saveState={saveState}
    />
  );
};
