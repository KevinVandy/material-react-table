import React, { FC, MouseEvent, useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  Tooltip,
  Divider,
  IconButtonProps,
  Box,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';
import { MRT_ColumnInstance } from '..';

interface Props extends IconButtonProps {}

export const MRT_ShowHideColumnsButton: FC<Props> = ({ ...rest }) => {
  const {
    tableInstance,
    localization,
    icons: { ViewColumnIcon },
  } = useMRT();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization.showHideColumnsButtonTitle}>
        <IconButton
          aria-label={localization.showHideColumnsButtonTitle}
          onClick={handleClick}
          size="small"
          {...rest}
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '0 0.5rem 0.5rem 0.5rem',
          }}
        >
          <Button
            disabled={
              !tableInstance.getToggleHideAllColumnsProps().checked &&
              !tableInstance.getToggleHideAllColumnsProps().indeterminate
            }
            onClick={() => tableInstance.toggleHideAllColumns(true)}
          >
            {localization.columnShowHideMenuHideAll}
          </Button>
          <Button
            disabled={tableInstance.getToggleHideAllColumnsProps().checked}
            onClick={() => tableInstance.toggleHideAllColumns(false)}
          >
            {localization.columnShowHideMenuShowAll}
          </Button>
        </Box>
        <Divider />
        {tableInstance.columns.map((column: MRT_ColumnInstance, index) => (
          <MRT_ShowHideColumnsMenu
            key={`${index}-${column.id}`}
            column={column}
          />
        ))}
      </Menu>
    </>
  );
};
