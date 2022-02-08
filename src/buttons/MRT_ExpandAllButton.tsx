import React, { FC } from 'react';
import { IconButton, styled } from '@mui/material';
import MuiArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TableButtonCell } from '../table/MRT_TableButtonCell';

const ArrowRightIcon = styled(MuiArrowRightIcon, {
  shouldForwardProp: (prop) => prop !== 'rotation',
})<{ rotation?: number }>(({ rotation }) => ({
  transform: `rotate(${rotation}deg)`,
  transition: 'transform 0.2s',
}));

interface Props {}

export const MRT_ExpandAllButton: FC<Props> = () => {
  const { tableInstance, localization, anyRowsExpanded, densePadding } = useMaterialReactTable();

  return (
    <MRT_TableButtonCell
      size="small"
      densePadding={densePadding}
      {...tableInstance.getToggleAllRowsExpandedProps()}
    >
      <IconButton
        aria-label={localization?.expandAllButtonTitle}
        title={localization?.expandAllButtonTitle}
      >
        <ArrowRightIcon
          fontSize="small"
          rotation={tableInstance.isAllRowsExpanded ? -180 : anyRowsExpanded ? -90 : 0}
        />
      </IconButton>
    </MRT_TableButtonCell>
  );
};
