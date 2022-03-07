import React, { FC } from 'react';
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Row } from '..';

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
    >
      <MenuList dense={tableInstance.state.densePadding} disablePadding>
        {enableRowEditing && (
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>{localization.rowActionMenuItemEdit}</ListItemText>
          </MenuItem>
        )}
        {renderRowActionMenuItems?.(row, tableInstance, () =>
          setAnchorEl(null),
        ) ?? null}
      </MenuList>
    </Menu>
  );
};
