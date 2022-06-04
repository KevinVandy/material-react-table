import React, { FC } from 'react';
import { Divider, Theme } from '@mui/material';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHeadCellResizeHandle: FC<Props> = ({
  header,
  tableInstance,
}) => {
  const { getState } = tableInstance;

  const { showFilters } = getState();

  const { column } = header;

  const { columnDefType } = column;

  return (
    <Divider
      flexItem
      orientation="vertical"
      onDoubleClick={() => column.resetSize()}
      sx={(theme: Theme) => ({
        borderRadius: '2px',
        borderRightWidth: '2px',
        cursor: 'col-resize',
        height: showFilters && columnDefType === 'data' ? '4rem' : '2rem',
        opacity: 0.8,
        position: 'absolute',
        right: '1px',
        touchAction: 'none',
        transition: column.getIsResizing() ? undefined : 'all 0.2s ease-in-out',
        userSelect: 'none',
        zIndex: 2000,
        '&:active': {
          backgroundColor: theme.palette.info.main,
          opacity: 1,
        },
      })}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      style={{
        transform: column.getIsResizing()
          ? `translateX(${getState().columnSizingInfo.deltaOffset}px)`
          : 'none',
      }}
    />
  );
};
