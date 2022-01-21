import React, { FC, MouseEvent, useState } from 'react';
import { IconButton, Menu, TableCell } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { ShowHideColumnsMenu } from '../menus/ShowHideColumnsMenu';

interface Props {}

export const MRT_ShowHideColumnsButton: FC<Props> = () => {
  const { tableInstance, localization } = useMaterialReactTable();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <TableCell style={{ width: 0, padding: 0 }}>
      <IconButton
        aria-label={localization?.showHideColumnsButtonTitle}
        title={localization?.showHideColumnsButtonTitle}
        onClick={handleClick}
        size="small"
        style={{ margin: '0 0.25rem 0 -0.5rem' }}
      >
        <ViewColumnIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {tableInstance.columns.map((column, index) => (
          <ShowHideColumnsMenu key={`${index}-${column.id}`} column={column} />
        ))}
      </Menu>
    </TableCell>
  );
};
