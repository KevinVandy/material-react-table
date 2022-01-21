import React, { FC } from 'react';
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { ColumnInstance } from 'react-table';

interface Props {
  column: ColumnInstance;
}

export const ShowHideColumnsMenu: FC<Props> = ({ column }) => {
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
        <ShowHideColumnsMenu key={`${i}-${c.id}`} column={c} />
      ))}
    </>
  );
};
