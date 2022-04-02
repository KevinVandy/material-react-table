import React, { FC, MouseEvent, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import type { MRT_Row } from '..';

const commonIconButtonStyles = {
  height: '2rem',
  ml: '10px',
  opacity: 0.5,
  transition: 'opacity 0.2s',
  width: '2rem',
  '&:hover': {
    opacity: 1,
  },
};

interface Props {
  row: MRT_Row;
}

export const MRT_ToggleRowActionMenuButton: FC<Props> = ({ row }) => {
  const {
    enableRowEditing,
    icons: { EditIcon, MoreHorizIcon },
    localization,
    renderRowActionMenuItems,
    renderRowActions,
    setCurrentEditingRow,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { currentEditingRow } = getState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenRowActionMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    setCurrentEditingRow({ ...row });
    setAnchorEl(null);
  };

  return (
    <>
      {renderRowActions ? (
        <>{renderRowActions(row, tableInstance)}</>
      ) : row.id === currentEditingRow?.id ? (
        <MRT_EditActionButtons row={row} />
      ) : !renderRowActionMenuItems && enableRowEditing ? (
        <Tooltip placement="right" arrow title={localization.edit}>
          <IconButton sx={commonIconButtonStyles} onClick={handleEdit}>
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
            handleEdit={handleEdit}
            row={row}
            setAnchorEl={setAnchorEl}
          />
        </>
      ) : null}
    </>
  );
};
