import React, { FC } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { ColumnInstance } from 'react-table';

interface Props {
  anchorEl: HTMLElement | null;
  column: ColumnInstance;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export const MRT_TableHeadCommandMenu: FC<Props> = ({
  anchorEl,
  column,
  setAnchorEl,
}) => {
  const { enableColumnHiding, localization } = useMaterialReactTable();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {enableColumnHiding && (
        <MenuItem onClick={() => column.toggleHidden()}>
          {localization?.toggleTableHeadCommandMenuHideMenuItem}
        </MenuItem>
      )}
    </Menu>
  );
};
