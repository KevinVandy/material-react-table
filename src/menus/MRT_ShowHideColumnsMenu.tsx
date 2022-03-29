import React, { FC } from 'react';
import { Button, Menu, Divider, Box } from '@mui/material';
import type { MRT_ColumnInstance } from '..';
import { useMRT } from '../useMRT';
import { MRT_ShowHideColumnsMenuItems } from './MRT_ShowHideColumnsMenuItems';

interface Props {
  anchorEl: HTMLElement | null;
  isSubMenu?: boolean;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export const MRT_ShowHideColumnsMenu: FC<Props> = ({
  anchorEl,
  isSubMenu,
  setAnchorEl,
}) => {
  const {
    localization,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const hideAllColumns = () => {
    (tableInstance.getVisibleLeafColumns() as MRT_ColumnInstance[])
      .filter((col: MRT_ColumnInstance) => col.enableHiding)
      .forEach((col: MRT_ColumnInstance) => col.toggleVisibility(false));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: getState().densePadding,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: isSubMenu ? 'center' : 'space-between',
          p: '0.5rem',
          pt: 0,
        }}
      >
        {!isSubMenu && (
          <Button
            disabled={!tableInstance.getIsSomeColumnsVisible()}
            onClick={hideAllColumns}
          >
            {localization.hideAll}
          </Button>
        )}
        <Button
          disabled={tableInstance.getIsAllColumnsVisible()}
          onClick={() => tableInstance.toggleAllColumnsVisible(false)}
        >
          {localization.showAll}
        </Button>
      </Box>
      <Divider />
      {tableInstance.getAllColumns().map((column, index) => (
        <MRT_ShowHideColumnsMenuItems
          column={column}
          isSubMenu={isSubMenu}
          key={`${index}-${column.id}`}
        />
      ))}
    </Menu>
  );
};
