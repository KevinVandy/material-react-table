import React, { FC } from 'react';
import { Box, ListItemIcon, Menu, MenuItem } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';
import {
  commonListItemStyles,
  commonMenuItemStyles,
} from './MRT_ColumnActionMenu';

interface Props {
  anchorEl: HTMLElement | null;
  handleEdit: () => void;
  row: MRT_Row;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  instance: MRT_TableInstance;
}

export const MRT_RowActionMenu: FC<Props> = ({
  anchorEl,
  handleEdit,
  row,
  setAnchorEl,
  instance,
}) => {
  const {
    getState,
    options: {
      icons: { EditIcon },
      enableEditing,
      localization,
      renderRowActionMenuItems,
    },
  } = instance;

  const { isDensePadding } = getState();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: isDensePadding,
      }}
    >
      {enableEditing && (
        <MenuItem onClick={handleEdit} sx={commonMenuItemStyles}>
          <Box sx={commonListItemStyles}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            {localization.edit}
          </Box>
        </MenuItem>
      )}
      {renderRowActionMenuItems?.({
        row,
        instance,
        closeMenu: () => setAnchorEl(null),
      })}
    </Menu>
  );
};
