import React, { MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { TRT_ColumnActionMenu } from '../menus/TRT_ColumnActionMenu';
import type { TRT_Header, TRT_TableInstance } from '../TailwindCSSReactTable.d';

interface Props {
  header: TRT_Header;
  table: TRT_TableInstance;
}

export const TRT_TableHeadCellColumnActionsButton = ({
  header,
  table,
}: Props) => {
  const {
    options: {
      icons: { MoreVertIcon },
      localization,
      tableHeadCellColumnActionsButtonProps,
    },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const mTableHeadCellColumnActionsButtonProps =
    tableHeadCellColumnActionsButtonProps instanceof Function
      ? tableHeadCellColumnActionsButtonProps({ column, table })
      : tableHeadCellColumnActionsButtonProps;

  const mcTableHeadCellColumnActionsButtonProps =
    columnDef.tableHeadCellColumnActionsButtonProps instanceof Function
      ? columnDef.tableHeadCellColumnActionsButtonProps({
          column,
          table,
        })
      : columnDef.tableHeadCellColumnActionsButtonProps;

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
        title={iconButtonProps?.title ?? localization.columnActions}
      >
        <IconButton
          aria-label={localization.columnActions}
          onClick={handleClick}
          size="small"
          {...iconButtonProps}
          sx={(theme) => ({
            height: '2rem',
            m: '-8px -4px',
            opacity: 0.5,
            transform: 'scale(0.85) translateX(-4px)',
            transition: 'opacity 150ms',
            width: '2rem',
            '&:hover': {
              opacity: 1,
            },
            ...(iconButtonProps?.sx instanceof Function
              ? iconButtonProps.sx(theme)
              : (iconButtonProps?.sx as any)),
          })}
          title={undefined}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      {anchorEl && (
        <TRT_ColumnActionMenu
          anchorEl={anchorEl}
          header={header}
          setAnchorEl={setAnchorEl}
          table={table}
        />
      )}
    </>
  );
};
