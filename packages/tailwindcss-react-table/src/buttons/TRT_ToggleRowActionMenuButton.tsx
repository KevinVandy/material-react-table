import React, { MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { TRT_RowActionMenu } from '../menus/TRT_RowActionMenu';
import { TRT_EditActionButtons } from './TRT_EditActionButtons';
import type {
  TRT_Cell,
  TRT_Row,
  TRT_TableInstance,
} from '../TailwindCSSReactTable.d';

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

interface Props<TData extends Record<string, any> = {}> {
  cell: TRT_Cell<TData>;
  row: TRT_Row<TData>;
  table: TRT_TableInstance<TData>;
}

export const TRT_ToggleRowActionMenuButton = <
  TData extends Record<string, any> = {},
>({
  cell,
  row,
  table,
}: Props<TData>) => {
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
        renderRowActions({ cell, row, table })
      ) : row.id === editingRow?.id && editingMode === 'row' ? (
        <TRT_EditActionButtons row={row} table={table} />
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
          <TRT_RowActionMenu
            anchorEl={anchorEl}
            handleEdit={handleStartEditMode}
            row={row as any}
            setAnchorEl={setAnchorEl}
            table={table as any}
          />
        </>
      ) : null}
    </>
  );
};
