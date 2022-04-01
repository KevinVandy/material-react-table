import React, { FC } from 'react';
import { Button, Menu, Divider, Box } from '@mui/material';
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
    tableInstance: {
      getAllColumns,
      getIsAllColumnsVisible,
      getIsSomeColumnsVisible,
      getState,
      toggleAllColumnsVisible,
    },
  } = useMRT();

  const { isDensePadding } = getState();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: isDensePadding,
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
            disabled={!getIsSomeColumnsVisible()}
            onClick={() => toggleAllColumnsVisible(false)}
          >
            {localization.hideAll}
          </Button>
        )}
        <Button
          disabled={getIsAllColumnsVisible()}
          onClick={() => toggleAllColumnsVisible(true)}
        >
          {localization.showAll}
        </Button>
      </Box>
      <Divider />
      {getAllColumns()
        .filter((col) => col.isDisplayColumn)
        .map((column, index) => (
          <MRT_ShowHideColumnsMenuItems
            column={column}
            isSubMenu={isSubMenu}
            key={`${index}-${column.id}`}
          />
        ))}
      <Divider />
      {getAllColumns()
        .filter((col) => !col.isDisplayColumn)
        .map((column, index) => (
          <MRT_ShowHideColumnsMenuItems
            column={column}
            isSubMenu={isSubMenu}
            key={`${index}-${column.id}`}
          />
        ))}
    </Menu>
  );
};
