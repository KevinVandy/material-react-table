import React, { FC, useMemo } from 'react';
import { Button, Menu, Divider, Box } from '@mui/material';
import { MRT_ShowHideColumnsMenuItems } from './MRT_ShowHideColumnsMenuItems';
import type { MRT_Column, MRT_TableInstance } from '..';
import { getDefaultColumnOrderIds } from '../utils';

interface Props {
  anchorEl: HTMLElement | null;
  isSubMenu?: boolean;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  instance: MRT_TableInstance;
}

export const MRT_ShowHideColumnsMenu: FC<Props> = ({
  anchorEl,
  isSubMenu,
  setAnchorEl,
  instance,
}) => {
  const {
    getAllColumns,
    getAllLeafColumns,
    getCenterLeafColumns,
    getIsAllColumnsVisible,
    getIsSomeColumnsPinned,
    getIsSomeColumnsVisible,
    getLeftLeafColumns,
    getRightLeafColumns,
    getState,
    toggleAllColumnsVisible,
    options: { localization, enablePinning, enableColumnOrdering },
  } = instance;

  const { density, columnOrder, columnPinning } = getState();

  const hideAllColumns = () => {
    getAllLeafColumns()
      .filter((col) => col.columnDef.enableHiding !== false)
      .forEach((col) => col.toggleVisibility(false));
  };

  const allColumns = useMemo(() => {
    const columns = getAllColumns();
    if (
      columnOrder.length > 0 &&
      !columns.some((col) => col.columnDefType === 'group')
    ) {
      return [
        ...getLeftLeafColumns(),
        ...Array.from(new Set(columnOrder)).map((colId) =>
          getCenterLeafColumns().find((col) => col?.id === colId),
        ),
        ...getRightLeafColumns(),
      ].filter(Boolean);
    }
    return columns;
  }, [
    columnOrder,
    columnPinning,
    getAllColumns(),
    getCenterLeafColumns(),
    getLeftLeafColumns(),
    getRightLeafColumns(),
  ]) as MRT_Column[];

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: density === 'compact',
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
            onClick={hideAllColumns}
          >
            {localization.hideAll}
          </Button>
        )}
        {!isSubMenu && enableColumnOrdering && (
          <Button
            onClick={() =>
              instance.setColumnOrder(
                getDefaultColumnOrderIds(instance.options as any),
              )
            }
          >
            {localization.resetOrder}
          </Button>
        )}
        {!isSubMenu && enablePinning && (
          <Button
            disabled={!getIsSomeColumnsPinned()}
            onClick={() => instance.resetColumnPinning(true)}
          >
            {localization.unpinAll}
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
      {allColumns.map((column, index) => (
        <MRT_ShowHideColumnsMenuItems
          allColumns={allColumns}
          column={column}
          isSubMenu={isSubMenu}
          key={`${index}-${column.id}`}
          instance={instance}
        />
      ))}
    </Menu>
  );
};
