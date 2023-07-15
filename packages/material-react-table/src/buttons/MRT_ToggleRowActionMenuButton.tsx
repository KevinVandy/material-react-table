import { type MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import { type MRT_Cell, type MRT_Row, type MRT_TableInstance } from '../types';

const commonIconButtonStyles = {
  height: '2rem',
  ml: '10px',
  opacity: 0.5,
  transition: 'opacity 150ms',
  width: '2rem',
  '&:hover': {
    opacity: 1,
  },
};

interface Props<TData extends Record<string, any>> {
  cell: MRT_Cell<TData>;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleRowActionMenuButton = <
  TData extends Record<string, any>,
>({
  cell,
  row,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableEditing,
      icons: { EditIcon, MoreHorizIcon },
      localization,
      renderRowActionMenuItems,
      renderRowActions,
    },
    setEditingRow,
  } = table;

  const { creatingRow, editingRow } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const showEditActionButtons =
    (isCreating && createDisplayMode === 'row') ||
    (isEditing && editDisplayMode === 'row');

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
      {renderRowActions && !showEditActionButtons ? (
        renderRowActions({ cell, row, table })
      ) : showEditActionButtons ? (
        <MRT_EditActionButtons row={row} table={table} />
      ) : !renderRowActionMenuItems &&
        (enableEditing instanceof Function
          ? enableEditing(row)
          : enableEditing) ? (
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
