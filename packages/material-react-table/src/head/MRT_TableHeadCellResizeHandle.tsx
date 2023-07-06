import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellResizeHandle = <
  TData extends Record<string, any>,
>({
  header,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { columnResizeMode },
    setColumnSizingInfo,
  } = table;
  const { density } = getState();
  const { column } = header;

  return (
    <Box
      className="Mui-TableHeadCell-ResizeHandle-Wrapper"
      onDoubleClick={() => {
        setColumnSizingInfo((old) => ({
          ...old,
          isResizingColumn: false,
        }));
        column.resetSize();
      }}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      sx={(theme) => ({
        cursor: 'col-resize',
        mr: density === 'compact' ? '-0.75rem' : '-1rem',
        position: 'absolute',
        right: '4px',
        px: '4px',
        '&:active > hr': {
          backgroundColor: theme.palette.info.main,
          opacity: 1,
        },
      })}
      style={{
        transform:
          column.getIsResizing() && columnResizeMode === 'onEnd'
            ? `translateX(${getState().columnSizingInfo.deltaOffset ?? 0}px)`
            : undefined,
      }}
    >
      <Divider
        className="Mui-TableHeadCell-ResizeHandle-Divider"
        flexItem
        orientation="vertical"
        sx={{
          borderRadius: '2px',
          borderWidth: '2px',
          height: '24px',
          touchAction: 'none',
          transition: column.getIsResizing()
            ? undefined
            : 'all 150ms ease-in-out',
          userSelect: 'none',
          zIndex: 4,
        }}
      />
    </Box>
  );
};
