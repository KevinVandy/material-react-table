import TableFooter, { type TableFooterProps } from '@mui/material/TableFooter';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import {
  type MRT_ColumnVirtualizer,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableFooterProps<TData extends MRT_RowData>
  extends TableFooterProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooter = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
  ...rest
}: MRT_TableFooterProps<TData>) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, layoutMode, muiTableFooterProps },
    refs: { tableFooterRef },
  } = table;
  const { isFullScreen } = getState();

  const tableFooterProps = {
    ...parseFromValuesOrFunc(muiTableFooterProps, {
      table,
    }),
    ...rest,
  };

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  return (
    <TableFooter
      {...tableFooterProps}
      ref={(ref: HTMLTableSectionElement) => {
        tableFooterRef.current = ref;
        if (tableFooterProps?.ref) {
          // @ts-ignore
          tableFooterProps.ref.current = ref;
        }
      }}
      sx={(theme) => ({
        bottom: stickFooter ? 0 : undefined,
        display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
        opacity: stickFooter ? 0.97 : undefined,
        outline: stickFooter
          ? theme.palette.mode === 'light'
            ? `1px solid ${theme.palette.grey[300]}`
            : `1px solid ${theme.palette.grey[700]}`
          : undefined,
        position: stickFooter ? 'sticky' : 'relative',
        zIndex: stickFooter ? 1 : undefined,
        ...(parseFromValuesOrFunc(tableFooterProps?.sx, theme) as any),
      })}
    >
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          columnVirtualizer={columnVirtualizer}
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          table={table}
        />
      ))}
    </TableFooter>
  );
};
