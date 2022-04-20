import React, { FC } from 'react';
import { FormControlLabel, MenuItem, Switch } from '@mui/material';
import type { MRT_ColumnInstance, MRT_TableInstance } from '..';
import { commonMenuItemStyles } from './MRT_ColumnActionMenu';

interface Props {
  column: MRT_ColumnInstance;
  isSubMenu?: boolean;
  tableInstance: MRT_TableInstance;
}

export const MRT_ShowHideColumnsMenuItems: FC<Props> = ({
  column,
  isSubMenu,
  tableInstance,
}) => {
  const {
    getState,
    options: { onToggleColumnVisibility },
  } = tableInstance;

  const { columnVisibility } = getState();

  const switchChecked =
    (column.columnDefType !== 'group' && column.getIsVisible()) ||
    (column.columnDefType === 'group' &&
      column.getLeafColumns().some((col) => col.getIsVisible()));

  const handleToggleColumnHidden = (column: MRT_ColumnInstance) => {
    if (column.columnDefType === 'group') {
      column?.columns?.forEach?.((childColumn: MRT_ColumnInstance) => {
        childColumn.toggleVisibility(!switchChecked);
      });
    } else {
      column.toggleVisibility();
    }
    onToggleColumnVisibility?.({
      column,
      columnVisibility,
      tableInstance,
    });
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
          tableInstance={tableInstance}
        />
      ))}
    </>
  );
};
