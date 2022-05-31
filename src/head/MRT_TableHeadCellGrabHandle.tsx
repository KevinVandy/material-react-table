import { IconButton, Tooltip } from '@mui/material';
import React, { FC, forwardRef, Ref } from 'react';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  ref: Ref<HTMLButtonElement>;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHeadCellGrabHandle: FC<Props> = forwardRef(
  ({ tableInstance }, ref) => {
    const {
      options: {
        icons: { DragHandleIcon },
        localization,
      },
    } = tableInstance;

    return (
      <Tooltip
        arrow
        enterDelay={1000}
        enterNextDelay={1000}
        placement="top"
        title={localization.grab}
      >
        <IconButton
          disableRipple
          ref={ref}
          size="small"
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
          }}
        >
          <DragHandleIcon />
        </IconButton>
      </Tooltip>
    );
  },
);
