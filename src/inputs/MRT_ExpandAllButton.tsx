import React, { FC } from 'react';
import { IconButton, TableCell } from '@mui/material';
import AllOutIcon from '@mui/icons-material/AllOut';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {}

export const MRT_ExpandAllButton: FC<Props> = () => {
  const { tableInstance } = useMaterialReactTable();

  return (
    <TableCell
      size="small"
      variant="head"
      {...tableInstance.getToggleAllRowsExpandedProps({
        style: { width: '2rem' },
      })}
    >
      <IconButton>
        <AllOutIcon
          fontSize="small"
          style={{
            transform: tableInstance.isAllRowsExpanded
              ? 'rotate(90deg)'
              : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};
