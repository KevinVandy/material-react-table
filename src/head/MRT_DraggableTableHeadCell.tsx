import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import type { MRT_Column, MRT_Header, MRT_TableInstance } from '..';
import { reorderColumn } from '../utils';

interface Props {
  header: MRT_Header;
  instance: MRT_TableInstance;
}

export const MRT_DraggableTableHeadCell: FC<Props> = ({ header, instance }) => {
  const { getState, setColumnOrder } = instance;

  const { columnOrder } = getState();

  const { column } = header;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (movingColumn: MRT_Column) => {
      const newColumnOrder = reorderColumn(movingColumn, column, columnOrder);
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  return (
    <MRT_TableHeadCell
      dragRef={dragRef}
      dropRef={dropRef}
      header={header}
      isDragging={isDragging}
      previewRef={previewRef}
      instance={instance}
    />
  );
};
