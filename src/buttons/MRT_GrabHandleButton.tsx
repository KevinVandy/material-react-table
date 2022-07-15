import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { DragEventHandler, FC } from 'react';
import { MRT_TableInstance } from '..';

interface Props {
  iconButtonProps?: IconButtonProps;
  onDragStart: DragEventHandler<HTMLButtonElement>;
  onDragEnd: DragEventHandler<HTMLButtonElement>;
  table: MRT_TableInstance;
}

export const MRT_GrabHandleButton: FC<Props> = ({
  iconButtonProps,
  onDragEnd,
  onDragStart,
  table,
}) => {
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
      title={localization.move}
    >
      <IconButton
        disableRipple
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        size="small"
        {...iconButtonProps}
        sx={{
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
          ...iconButtonProps?.sx,
        }}
      >
        <DragHandleIcon />
      </IconButton>
    </Tooltip>
  );
};
