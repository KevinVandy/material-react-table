import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { DragEventHandler } from 'react';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  iconButtonProps?: IconButtonProps;
  onDragStart: DragEventHandler<HTMLButtonElement>;
  onDragEnd: DragEventHandler<HTMLButtonElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_GrabHandleButton = <TData extends Record<string, any> = {}>({
  iconButtonProps,
  onDragEnd,
  onDragStart,
  table,
}: Props<TData>) => {
  const {
    options: {
      icons: { DragHandleIcon },
      localization,
    },
  } = table;

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      placement="top"
      title={iconButtonProps?.title ?? localization.move}
    >
      <IconButton
        disableRipple
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        size="small"
        {...iconButtonProps}
        onClick={(e) => {
          e.stopPropagation();
          iconButtonProps?.onClick?.(e);
        }}
        sx={(theme) => ({
          cursor: 'grab',
          m: 0,
          opacity: 0.5,
          p: '2px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: 1,
          },
          '&:active': {
            cursor: 'grabbing',
          },
          ...(iconButtonProps?.sx instanceof Function
            ? iconButtonProps?.sx(theme)
            : (iconButtonProps?.sx as any)),
        })}
        title={undefined}
      >
        <DragHandleIcon />
      </IconButton>
    </Tooltip>
  );
};
