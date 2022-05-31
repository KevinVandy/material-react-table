import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  tableInstance: MRT_TableInstance;
}

export const MRT_DraggableTableHeadCell: FC<Props> = ({
  header,
  tableInstance,
}) => {
  const {
    getState,
    options: {},
    setColumnOrder,
  } = tableInstance;

  const { columnOrder } = getState();

  const reorder = (item: MRT_Header, newIndex: number) => {
    const { index: currentIndex } = item;
    columnOrder.splice(newIndex, 0, columnOrder.splice(currentIndex, 1)[0]);
    setColumnOrder([...columnOrder]);
  };

  const [, drop] = useDrop({
    accept: 'header',
    drop: (item: MRT_Header) => reorder(item, header.index),
  });

  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => header,
    type: 'header',
  });

  return (
    <MRT_TableHeadCell
      dragRef={drag}
      dropRef={drop}
      header={header}
      isDragging={isDragging}
      previewRef={preview}
      tableInstance={tableInstance}
    />
  );
};
