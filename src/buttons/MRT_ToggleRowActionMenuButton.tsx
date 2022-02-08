import React, { FC, MouseEvent, useState } from 'react';
import { IconButton as MuiIconButton, styled } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { Row } from 'react-table';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import { MRT_TableButtonCell } from '../table/MRT_TableButtonCell';

const IconButton = styled(MuiIconButton)({
  opacity: 0.5,
  transition: 'opacity 0.2s',
  marginRight: '2px',
  height: '2rem',
  width: '2rem',
  '&:hover': {
    opacity: 1,
  },
});

interface Props {
  row: Row;
}

export const MRT_ToggleRowActionMenuButton: FC<Props> = ({ row }) => {
  const { localization, currentEditingRow, renderRowActions, tableInstance, densePadding } =
    useMaterialReactTable();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenRowActionMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  return (
    <MRT_TableButtonCell densePadding={densePadding}>
      {renderRowActions ? (
        <>{renderRowActions(row, tableInstance)}</>
      ) : row.id === currentEditingRow?.id ? (
        <MRT_EditActionButtons row={row} />
      ) : (
        <>
          {' '}
          <IconButton
            aria-label={localization?.rowActionMenuButtonTitle}
            title={localization?.rowActionMenuButtonTitle}
            onClick={handleOpenRowActionMenu}
            size="small"
          >
            <MoreHorizIcon />
          </IconButton>
          <MRT_RowActionMenu anchorEl={anchorEl} row={row} setAnchorEl={setAnchorEl} />
        </>
      )}
    </MRT_TableButtonCell>
  );
};
