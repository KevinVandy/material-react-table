import React, { FC, MouseEvent, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import type { MRT_Cell, MRT_Row, MRT_TableInstance } from '..';

const commonIconButtonStyles = {
  height: '2rem',
  ml: '10px',
  opacity: 0.5,
  transition: 'opacity 0.1s',
  width: '2rem',
  '&:hover': {
    opacity: 1,
  },
};

interface Props {
  cell: MRT_Cell;
  row: MRT_Row;
  table: MRT_TableInstance;
}

export const MRT_ToggleRowActionMenuButton: FC<Props> = ({
  cell,
  row,
  table,
}) => {
  const {
    getState,
    options: {
      editingMode,
      enableEditing,
      icons: { EditIcon, MoreHorizIcon },
      localization,
      renderRowActionMenuItems,
      renderRowActions,
    },
    setEditingRow,
  } = table;

  const { editingRow } = getState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenRowActionMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleStartEditMode = (event: MouseEvent) => {
    event.stopPropagation();
    setEditingRow({ ...row });
    setAnchorEl(null);
  };

  return (
    <>
      {renderRowActions ? (
        <>{renderRowActions({ cell, row, table })}</>
      ) : row.id === editingRow?.id && editingMode === 'row' ? (
        <MRT_EditActionButtons row={row} table={table} />
      ) : !renderRowActionMenuItems && enableEditing ? (
        <Tooltip placement="right" arrow title={localization.edit}>
          <IconButton
            aria-label={localization.edit}
            sx={commonIconButtonStyles}
            onClick={handleStartEditMode}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : renderRowActionMenuItems ? (
        <>
          <Tooltip
            arrow
            enterDelay={1000}
            enterNextDelay={1000}
            title={localization.rowActions}
          >
            <IconButton
              aria-label={localization.rowActions}
              onClick={handleOpenRowActionMenu}
              size="small"
              sx={commonIconButtonStyles}
            >
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
          <MRT_RowActionMenu
            anchorEl={anchorEl}
            handleEdit={handleStartEditMode}
            row={row}
            setAnchorEl={setAnchorEl}
            table={table}
          />
        </>
      ) : null}
    </>
  );
};
