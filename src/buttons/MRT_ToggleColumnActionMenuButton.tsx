import React, { FC, MouseEvent, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MRT_ColumnActionMenu } from '../menus/MRT_ColumnActionMenu';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  tableInstance: MRT_TableInstance;
}

export const MRT_ToggleColumnActionMenuButton: FC<Props> = ({
  header,
  tableInstance,
}) => {
  const {
    options: {
      icons: { MoreVertIcon },
      localization,
      muiTableHeadCellColumnActionsButtonProps,
    },
  } = tableInstance;

  const { column } = header;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const mTableHeadCellColumnActionsButtonProps =
    muiTableHeadCellColumnActionsButtonProps instanceof Function
      ? muiTableHeadCellColumnActionsButtonProps({ column, tableInstance })
      : muiTableHeadCellColumnActionsButtonProps;

  const mcTableHeadCellColumnActionsButtonProps =
    column.columnDef.muiTableHeadCellColumnActionsButtonProps instanceof
    Function
      ? column.columnDef.muiTableHeadCellColumnActionsButtonProps({
          column,
          tableInstance,
        })
      : column.columnDef.muiTableHeadCellColumnActionsButtonProps;

  const iconButtonProps = {
    ...mTableHeadCellColumnActionsButtonProps,
    ...mcTableHeadCellColumnActionsButtonProps,
  };

  return (
    <>
      <Tooltip
        arrow
        enterDelay={1000}
        enterNextDelay={1000}
        placement="top"
        title={localization.columnActions}
      >
        <IconButton
          aria-label={localization.columnActions}
          onClick={handleClick}
          size="small"
          {...iconButtonProps}
          sx={{
            height: '2rem',
            mr: '2px',
            mt: '-0.2rem',
            opacity: 0.5,
            transition: 'opacity 0.2s',
            width: '2rem',
            '&:hover': {
              opacity: 1,
            },
            ...iconButtonProps.sx,
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <MRT_ColumnActionMenu
        anchorEl={anchorEl}
        header={header}
        setAnchorEl={setAnchorEl}
        tableInstance={tableInstance}
      />
    </>
  );
};
