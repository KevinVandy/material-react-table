import React, { FC, Ref } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box, FormControlLabel, MenuItem, Switch } from '@mui/material';
import { MRT_ColumnPinningButtons } from '../buttons/MRT_ColumnPinningButtons';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { reorderColumn } from '../utils';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  allColumns: MRT_Column[];
  column: MRT_Column;
  isSubMenu?: boolean;
  tableInstance: MRT_TableInstance;
}

export const MRT_ShowHideColumnsMenuItems: FC<Props> = ({
  allColumns,
  column,
  isSubMenu,
  tableInstance,
}) => {
  const {
    getState,
    options: { enableColumnOrdering, onToggleColumnVisibility },
    setColumnOrder,
  } = tableInstance;

  const { columnOrder, columnVisibility } = getState();

  const { columnDef, columnDefType } = column;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (movingColumn: MRT_Column) =>
      reorderColumn(movingColumn, column, columnOrder, setColumnOrder),
  });

  const [, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  const switchChecked =
    (columnDefType !== 'group' && column.getIsVisible()) ||
    (columnDefType === 'group' &&
      column.getLeafColumns().some((col) => col.getIsVisible()));

  const handleToggleColumnHidden = (column: MRT_Column) => {
    if (columnDefType === 'group') {
      column?.columns?.forEach?.((childColumn: MRT_Column) => {
        childColumn.toggleVisibility(!switchChecked);
      });
    } else {
      column.toggleVisibility();
    }
    onToggleColumnVisibility?.({
      column,
      columnVisibility,
      tableInstance,
    });
  };

  return (
    <>
      <MenuItem
        ref={columnDefType === 'data' ? dropRef : undefined}
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          my: 0,
          pl: `${(column.depth + 0.5) * 2}rem`,
          py: '6px',
        }}
      >
        <Box
          ref={previewRef}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '8px',
          }}
        >
          {columnDefType !== 'group' &&
            enableColumnOrdering &&
            columnDef.enableColumnOrdering !== false &&
            !allColumns.some((col) => col.columnDefType === 'group') && (
              <MRT_GrabHandleButton
                ref={dragRef as Ref<HTMLButtonElement>}
                tableInstance={tableInstance}
              />
            )}
          {!isSubMenu && column.getCanPin() && (
            <MRT_ColumnPinningButtons
              column={column}
              tableInstance={tableInstance}
            />
          )}
          <FormControlLabel
            componentsProps={{
              typography: {
                sx: {
                  mb: 0,
                  opacity: columnDefType !== 'display' ? 1 : 0.5,
                },
              },
            }}
            checked={switchChecked}
            control={<Switch />}
            disabled={
              (isSubMenu && switchChecked) ||
              !column.getCanHide() ||
              column.getIsGrouped()
            }
            label={columnDef.header}
            onChange={() => handleToggleColumnHidden(column)}
          />
        </Box>
      </MenuItem>
      {column.columns?.map((c: MRT_Column, i) => (
        <MRT_ShowHideColumnsMenuItems
          allColumns={allColumns}
          key={`${i}-${c.id}`}
          column={c}
          isSubMenu={isSubMenu}
          tableInstance={tableInstance}
        />
      ))}
    </>
  );
};
