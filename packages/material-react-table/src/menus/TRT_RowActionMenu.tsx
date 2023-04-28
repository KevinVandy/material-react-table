import React, { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  commonListItemStyles,
  commonMenuItemStyles,
} from './TRT_ColumnActionMenu';
import type { TRT_Row, TRT_TableInstance } from '..';

interface Props {
  anchorEl: HTMLElement | null;
  handleEdit: (event: MouseEvent) => void;
  row: TRT_Row;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  table: TRT_TableInstance;
}

export const TRT_RowActionMenu = ({
  anchorEl,
  handleEdit,
  row,
  setAnchorEl,
  table,
}: Props) => {
  const {
    getState,
    options: {
      icons: { EditIcon },
      enableEditing,
      localization,
      renderRowActionMenuItems,
    },
  } = table;
  const { density } = getState();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClick={(event) => event.stopPropagation()}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: density === 'compact',
      }}
    >
      {enableEditing instanceof Function
        ? enableEditing(row)
        : enableEditing && (
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
        table,
        closeMenu: () => setAnchorEl(null),
      })}
    </Menu>
  );
};
