import React, { FC, MouseEvent, useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { ColumnInstance } from 'react-table';

interface ColumnsMenuItemProps {
  column: ColumnInstance;
}

const ColumnsMenuItem: FC<ColumnsMenuItemProps> = ({ column }) => {
  const { maxColumnDepth } = useMaterialReactTable();

  const isMaxDepth = column.depth === maxColumnDepth;

  return (
    <>
      <MenuItem style={{ paddingLeft: `${column.depth + 1}rem` }}>
        {isMaxDepth ? (
          <FormControlLabel
            onChange={() => isMaxDepth && column.toggleHidden()}
            label={column.Header as string}
            checked={column.isVisible}
            control={<Checkbox />}
          />
        ) : (
          <Typography>{column.Header}</Typography>
        )}
      </MenuItem>
      {column.columns?.map((c, i) => (
        <ColumnsMenuItem key={`${i}-${c.id}`} column={c} />
      ))}
    </>
  );
};

interface Props {}

export const MRT_ShowHideColumnsButtonMenu: FC<Props> = () => {
  const { tableInstance, localization } = useMaterialReactTable();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        aria-label={localization?.showHideColumnsButtonTitle}
        title={localization?.showHideColumnsButtonTitle}
        onClick={handleClick}
      >
        <ViewColumnIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {tableInstance.columns.map((column, index) => (
          <ColumnsMenuItem key={`${index}-${column.id}`} column={column} />
        ))}
      </Menu>
    </>
  );
};
