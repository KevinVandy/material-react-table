import { type MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MRT_ColumnActionMenu } from '../menus/MRT_ColumnActionMenu';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellColumnActionsButton = <
  TData extends Record<string, any>,
>({
  header,
  table,
}: Props<TData>) => {
  const {
    options: {
      icons: { MoreVertIcon },
      localization,
      muiColumnActionsButtonProps,
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
    muiColumnActionsButtonProps instanceof Function
      ? muiColumnActionsButtonProps({ column, table })
      : muiColumnActionsButtonProps;

  const mcTableHeadCellColumnActionsButtonProps =
    columnDef.muiColumnActionsButtonProps instanceof Function
      ? columnDef.muiColumnActionsButtonProps({
          column,
          table,
        })
      : columnDef.muiColumnActionsButtonProps;

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
        <MRT_ColumnActionMenu
          anchorEl={anchorEl}
          header={header}
          setAnchorEl={setAnchorEl}
          table={table}
        />
      )}
    </>
  );
};
