import { type Range, defaultRangeExtractor } from '@tanstack/react-virtual';

/**
 * When scroll, the `draggingRow` or `draggingColumn` can be removed from document because of virtualization,
 * then, the `dragEnd` event on `MRT_TableBodyRowGrabHandle` or `MRT_TableHeadCellGrabHandle` will not fire.
 * We should keep the `draggingRow` or `draggingColumn` in `getVirtualItems()` to avoid this thing.
 */
export const DraggingRangeExtractor = (range: Range, draggingIndex: number) => {
  const newIndexs = defaultRangeExtractor(range);
  if (
    draggingIndex >= 0 &&
    draggingIndex < Math.max(range.startIndex - range.overscan, 0)
  ) {
    newIndexs.unshift(draggingIndex);
  }
  if (draggingIndex >= 0 && draggingIndex > range.endIndex + range.overscan) {
    newIndexs.push(draggingIndex);
  }
  return newIndexs;
};
