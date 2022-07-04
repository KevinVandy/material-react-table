import React, { FC } from 'react';
import { Divider, Theme } from '@mui/material';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellResizeHandle: FC<Props> = ({ header, table }) => {
  const { getState } = table;
  const { density, showFilters } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

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
        mr: density === 'compact' ? '-0.5rem' : '-1rem',
        opacity: 0.8,
        position: 'absolute',
        right: '1px',
        touchAction: 'none',
        transition: column.getIsResizing() ? undefined : 'all 0.2s ease-in-out',
        userSelect: 'none',
        zIndex: 4,
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
