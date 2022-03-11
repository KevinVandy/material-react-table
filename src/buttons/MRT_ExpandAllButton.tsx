import React, { FC } from 'react';
import { IconButton, TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import { commonTableBodyButtonCellStyles } from '../body/MRT_TableBodyCell';

interface Props {}

export const MRT_ExpandAllButton: FC<Props> = () => {
  const {
    anyRowsExpanded,
    icons: { DoubleArrowDownIcon },
    localization,
    tableInstance,
  } = useMRT();

  return (
    <TableCell
      size="small"
      {...tableInstance.getToggleAllRowsExpandedProps()}
      sx={commonTableBodyButtonCellStyles(tableInstance.state.densePadding)}
    >
      <IconButton
        aria-label={localization.expandAll}
        title={localization.expandAll}
      >
        <DoubleArrowDownIcon
          style={{
            transform: `rotate(${
              tableInstance.isAllRowsExpanded ? -180 : anyRowsExpanded ? -90 : 0
            }deg)`,
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};
