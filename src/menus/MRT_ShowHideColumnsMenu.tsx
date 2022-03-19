import React, { FC } from 'react';
import { Button, Menu, Divider, Box } from '@mui/material';
import type { MRT_ColumnInstance } from '..';
import { useMRT } from '../useMRT';
import { MRT_ShowHideColumnsMenuItems } from './MRT_ShowHideColumnsMenuItems';
import { findLowestLevelCols } from '../utils';

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
  const { localization, tableInstance } = useMRT();

  const hideAllColumns = () => {
    (
      findLowestLevelCols(
        tableInstance.columns as MRT_ColumnInstance[],
      ) as MRT_ColumnInstance[]
    )
      .filter((col: MRT_ColumnInstance) => !col.disableColumnHiding)
      .forEach((col: MRT_ColumnInstance) => col.toggleHidden(true));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: tableInstance.state.densePadding,
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
            disabled={
              !tableInstance.getToggleHideAllColumnsProps().checked &&
              !tableInstance.getToggleHideAllColumnsProps().indeterminate
            }
            onClick={hideAllColumns}
          >
            {localization.hideAll}
          </Button>
        )}
        <Button
          disabled={tableInstance.getToggleHideAllColumnsProps().checked}
          onClick={() => tableInstance.toggleHideAllColumns(false)}
        >
          {localization.showAll}
        </Button>
      </Box>
      <Divider />
      {tableInstance.columns.map((column: MRT_ColumnInstance, index) => (
        <MRT_ShowHideColumnsMenuItems
          column={column}
          isSubMenu={isSubMenu}
          key={`${index}-${column.id}`}
        />
      ))}
    </Menu>
  );
};
