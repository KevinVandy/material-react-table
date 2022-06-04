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

  const reorder = (movingHeader: MRT_Header, receivingHeader: MRT_Header) => {
    if (movingHeader.column.getCanPin()) {
      movingHeader.column.pin(receivingHeader.column.getIsPinned());
    }
    columnOrder.splice(
      receivingHeader.index,
      0,
      columnOrder.splice(movingHeader.index, 1)[0],
    );
    setColumnOrder([...columnOrder]);
  };

  const [, dropRef] = useDrop({
    accept: 'header',
    drop: (movingHeader: MRT_Header) => reorder(movingHeader, header),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => header,
    type: 'header',
  });

  return (
    <MRT_TableHeadCell
      dragRef={dragRef}
      dropRef={dropRef}
      header={header}
      isDragging={isDragging}
      previewRef={previewRef}
      tableInstance={tableInstance}
    />
  );
};
