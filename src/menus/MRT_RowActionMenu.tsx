import React, { FC } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Row } from '..';
import { commonMenuItemStyles } from './MRT_ColumnActionMenu';

interface Props {
  anchorEl: HTMLElement | null;
  row: MRT_Row;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  handleEdit: () => void;
}

export const MRT_RowActionMenu: FC<Props> = ({
  anchorEl,
  row,
  handleEdit,
  setAnchorEl,
}) => {
  const {
    icons: { EditIcon },
    enableRowEditing,
    localization,
    renderRowActionMenuItems,
    tableInstance,
  } = useMRT();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: tableInstance.state.densePadding,
      }}
    >
      {enableRowEditing && (
        <MenuItem onClick={handleEdit} sx={commonMenuItemStyles}>
          <EditIcon />
          {localization.rowActionMenuItemEdit}
        </MenuItem>
      )}
      {renderRowActionMenuItems?.(row, tableInstance, () =>
        setAnchorEl(null),
      ) ?? null}
    </Menu>
  );
};
