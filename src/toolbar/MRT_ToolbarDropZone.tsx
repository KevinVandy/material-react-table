import React, { DragEvent, FC } from 'react';
import { alpha, Box, Fade, Typography } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_ToolbarDropZone: FC<Props> = ({ table }) => {
  const {
    getState,
    options: { enableGrouping, localization },
    setHoveredColumn,
  } = table;

  const { draggingColumn, hoveredColumn } = getState();

  const handleDragEnter = (_event: DragEvent<HTMLDivElement>) => {
    setHoveredColumn({ id: 'drop-zone' });
  };

  return (
    <Fade unmountOnExit mountOnEnter in={!!enableGrouping && !!draggingColumn}>
      <Box
        sx={(theme) => ({
          alignItems: 'center',
          backgroundColor: alpha(
            theme.palette.info.main,
            hoveredColumn?.id === 'drop-zone' ? 0.2 : 0.1,
          ),
          border: `dashed ${theme.palette.info.main} 2px`,
          display: 'flex',
          justifyContent: 'center',
          height: 'calc(100% - 4px)',
          position: 'absolute',
          width: 'calc(100% - 4px)',
          zIndex: 2,
        })}
        onDragEnter={handleDragEnter}
      >
        <Typography>
          {localization.dropToGroupBy.replace(
            '{column}',
            draggingColumn?.columnDef?.header ?? '',
          )}
        </Typography>
      </Box>
    </Fade>
  );
};
