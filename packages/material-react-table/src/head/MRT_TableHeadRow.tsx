import TableRow from '@mui/material/TableRow';
import { alpha, lighten } from '@mui/material/styles';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { type VirtualItem } from '@tanstack/react-virtual';
import {
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_TableInstance,
} from '../types';

interface Props {
  headerGroup: MRT_HeaderGroup;
  table: MRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHeadRow = ({
  headerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props) => {
  const {
    options: { layoutMode, muiTableHeadRowProps },
  } = table;

  const tableRowProps =
    muiTableHeadRowProps instanceof Function
      ? muiTableHeadRowProps({ headerGroup, table })
      : muiTableHeadRowProps;

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.background.default, 0.04),
        boxShadow: `4px 0 8px ${alpha(theme.palette.common.black, 0.1)}`,
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        top: 0,
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps?.sx(theme)
          : (tableRowProps?.sx as any)),
      })}
    >
      {(virtualPaddingLeft && table.getLeftLeafColumns().length === 0) ? (
          <td style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
      {(virtualColumns ?? headerGroup.headers).map((headerOrVirtualHeader) => {
        const header = virtualColumns
          ? headerGroup.headers[headerOrVirtualHeader.index]
          : (headerOrVirtualHeader as MRT_Header);

        const renderedCell = <MRT_TableHeadCell header={header} key={header.id} table={table} />;
        if (virtualPaddingLeft && headerOrVirtualHeader.index === (table.getLeftLeafColumns().length - 1)) {
            return [
                renderedCell,
                <th key="vp_left"  style={{ display: 'flex', width: virtualPaddingLeft }} />,
            ]
        } else if (virtualPaddingRight && headerOrVirtualHeader.index === (table.getVisibleLeafColumns().length - table.getRightLeafColumns().length)) {
            return [
                <th key="vp_right"  style={{ display: 'flex', width: virtualPaddingRight }} />,
                renderedCell
            ]
        } else {
            return renderedCell;
        }
      })}
      {(virtualPaddingRight && table.getRightLeafColumns().length === 0) ? (
          <td style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </TableRow>
  );
};
