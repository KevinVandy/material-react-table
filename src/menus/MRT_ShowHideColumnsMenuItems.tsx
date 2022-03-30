import React, { FC } from 'react';
import { FormControlLabel, MenuItem, Switch } from '@mui/material';
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
  console.log({ column });
  const {
    onColumnHide,
    tableInstance: { getState, getIsAllColumnsVisible },
  } = useMRT();
  const isParentHeader = !!column?.columns?.length;

  const switchChecked =
    column.getIsVisible() || (isParentHeader && getIsAllColumnsVisible());

  const handleToggleColumnHidden = (column: MRT_ColumnInstance) => {
    if (isParentHeader) {
      column?.columns?.forEach?.((childColumn: MRT_ColumnInstance) => {
        childColumn.toggleVisibility(!switchChecked);
      });
    } else {
      column.toggleVisibility();
    }
    onColumnHide?.(
      column,
      Object.entries(getState().columnVisibility)
        .filter((entry) => entry[1])
        .map((entry) => entry[0]),
    );
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
          disabled={
            (isSubMenu && switchChecked) || column.enableHiding === false
          }
          label={column.header}
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
