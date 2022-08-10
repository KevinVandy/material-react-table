import React, { MouseEvent, useState } from 'react';
import { IconButton, Tooltip, IconButtonProps } from '@mui/material';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends IconButtonProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: {
      icons: { ViewColumnIcon },
      localization,
    },
  } = table;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization.showHideColumns}>
        <IconButton
          aria-label={localization.showHideColumns}
          onClick={handleClick}
          {...rest}
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <MRT_ShowHideColumnsMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        table={table}
      />
    </>
  );
};
