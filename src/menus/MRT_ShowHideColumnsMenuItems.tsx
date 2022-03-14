import React, { FC } from 'react';
import { FormControlLabel, MenuItem, Switch } from '@mui/material';
import { ColumnInstance } from 'react-table';
import type { MRT_ColumnInstance } from '..';
import { commonMenuItemStyles } from './MRT_ColumnActionMenu';
import { useMRT } from '../useMRT';

interface Props {
  column: MRT_ColumnInstance;
  isSubMenu?: boolean;
}

export const MRT_ShowHideColumnsMenuItems: FC<Props> = ({
  column,
  isSubMenu,
}) => {
  const { onColumnHide, tableInstance } = useMRT();
  const isParentHeader = !!column?.columns?.length;

  const allChildColumnsVisible =
    isParentHeader &&
    !!column.columns?.every((childColumn) => childColumn.isVisible);

  const switchChecked = column.isVisible ?? allChildColumnsVisible;

  const handleToggleColumnHidden = (column: ColumnInstance) => {
    if (isParentHeader) {
      column?.columns?.forEach?.((childColumn) => {
        childColumn.toggleHidden(switchChecked);
      });
    } else {
      column.toggleHidden();
    }
    onColumnHide?.(column, tableInstance.state.hiddenColumns);
  };

  return (
    <>
      <MenuItem
        sx={{ ...commonMenuItemStyles, pl: `${(column.depth + 0.5) * 2}rem` }}
      >
        <FormControlLabel
          componentsProps={{ typography: { sx: { marginBottom: 0 } } }}
          checked={switchChecked}
          control={<Switch />}
          disabled={isSubMenu && switchChecked}
          label={column.Header as string}
          onChange={() => handleToggleColumnHidden(column)}
        />
      </MenuItem>
      {column.columns?.map((c: MRT_ColumnInstance, i) => (
        <MRT_ShowHideColumnsMenuItems
          key={`${i}-${c.id}`}
          column={c}
          isSubMenu={isSubMenu}
        />
      ))}
    </>
  );
};
