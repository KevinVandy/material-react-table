import React, { FC } from 'react';
import { Switch, Tooltip } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {}

export const MRT_DensePaddingSwitch: FC<Props> = () => {
  const { densePadding, setDensePadding, localization } = useMaterialReactTable();

  return (
    <Tooltip arrow title={localization?.toggleDensePaddingSwitchTitle ?? ''}>
      <Switch
        inputProps={{
          'aria-label': localization?.toggleDensePaddingSwitchTitle ?? '',
        }}
        color="default"
        checked={densePadding}
        size="small"
        onChange={() => setDensePadding(!densePadding)}
      />
    </Tooltip>
  );
};
