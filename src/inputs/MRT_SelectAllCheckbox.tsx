import React from 'react';
import { Checkbox } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_TableButtonCell } from '../table/MRT_TableButtonCell';

export const MRT_SelectAllCheckbox = () => {
  const { tableInstance, disableSelectAll, densePadding, localization } =
    useMRT();

  return (
    <MRT_TableButtonCell densePadding={densePadding} variant="head">
      {!disableSelectAll ? (
        <Checkbox
          inputProps={{
            'aria-label': localization?.selectAllCheckboxTitle ?? '',
          }}
          {...tableInstance.getToggleAllPageRowsSelectedProps()}
        />
      ) : null}
    </MRT_TableButtonCell>
  );
};
