import React, { FC } from 'react';
import { FormControlLabel, MenuItem, Switch } from '@mui/material';
import type { MRT_Column, MRT_TableInstance } from '..';
import { MRT_ColumnPinningButtons } from '../buttons/MRT_ColumnPinningButtons';

interface Props {
  column: MRT_Column;
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

  const handleToggleColumnHidden = (column: MRT_Column) => {
    if (column.columnDefType === 'group') {
      column?.columns?.forEach?.((childColumn: MRT_Column) => {
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
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          my: 0,
          pl: `${(column.depth + 0.5) * 2}rem`,
          py: '6px',
        }}
      >
        {!isSubMenu && column.getCanPin() && (
          <MRT_ColumnPinningButtons
            column={column}
            tableInstance={tableInstance}
          />
        )}
        <FormControlLabel
          componentsProps={{ typography: { sx: { marginBottom: 0 } } }}
          checked={switchChecked}
          control={<Switch />}
          disabled={(isSubMenu && switchChecked) || !column.getCanHide()}
          label={column.header}
          onChange={() => handleToggleColumnHidden(column)}
        />
      </MenuItem>
      {column.columns?.map((c: MRT_Column, i) => (
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
