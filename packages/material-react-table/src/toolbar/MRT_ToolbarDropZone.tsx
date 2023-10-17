import { type DragEvent, useEffect } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> extends BoxProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarDropZone = <TData extends MRT_RowData>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: { enableGrouping, localization },
    setHoveredColumn,
    setShowToolbarDropZone,
  } = table;

  const { draggingColumn, grouping, hoveredColumn, showToolbarDropZone } =
    getState();

  const handleDragEnter = (_event: DragEvent<HTMLDivElement>) => {
    setHoveredColumn({ id: 'drop-zone' });
  };

  useEffect(() => {
    if (table.options.state?.showToolbarDropZone !== undefined) {
      setShowToolbarDropZone(
        !!enableGrouping &&
          !!draggingColumn &&
          draggingColumn.columnDef.enableGrouping !== false &&
          !grouping.includes(draggingColumn.id),
      );
    }
  }, [enableGrouping, draggingColumn, grouping]);

  return (
    <Fade in={showToolbarDropZone}>
      <Box
        className="Mui-ToolbarDropZone"
        onDragEnter={handleDragEnter}
        {...rest}
        sx={(theme) => ({
          alignItems: 'center',
          backdropFilter: 'blur(4px)',
          backgroundColor: alpha(
            theme.palette.info.main,
            hoveredColumn?.id === 'drop-zone' ? 0.2 : 0.1,
          ),
          border: `dashed ${theme.palette.info.main} 2px`,
          boxSizing: 'border-box',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
          zIndex: 4,
          ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
        })}
      >
        <Typography fontStyle="italic">
          {localization.dropToGroupBy.replace(
            '{column}',
            draggingColumn?.columnDef?.header ?? '',
          )}
        </Typography>
      </Box>
    </Fade>
  );
};
