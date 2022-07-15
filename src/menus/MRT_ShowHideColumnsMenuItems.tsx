import React, {
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useState,
} from 'react';
import {
  Box,
  FormControlLabel,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { MRT_ColumnPinningButtons } from '../buttons/MRT_ColumnPinningButtons';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { reorderColumn } from '../utils';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  allColumns: MRT_Column[];
  column: MRT_Column;
  currentHoveredColumn: MRT_Column | null;
  isSubMenu?: boolean;
  setCurrentHoveredColumn: Dispatch<SetStateAction<MRT_Column | null>>;
  table: MRT_TableInstance;
}

export const MRT_ShowHideColumnsMenuItems: FC<Props> = ({
  allColumns,
  currentHoveredColumn,
  setCurrentHoveredColumn,
  column,
  isSubMenu,
  table,
}) => {
  const {
    getState,
    options: {
      enableColumnOrdering,
      enableHiding,
      enablePinning,
      localization,
    },
    setColumnOrder,
  } = table;
  const { columnOrder } = getState();
  const { columnDef } = column;
  const { columnDefType } = columnDef;

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
  };

  const menuItemRef = React.useRef<HTMLElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    e.dataTransfer.setDragImage(menuItemRef.current as HTMLElement, 0, 0);
  };

  const handleDragEnd = (_e: DragEvent<HTMLButtonElement>) => {
    setIsDragging(false);
    setCurrentHoveredColumn(null);
    if (currentHoveredColumn) {
      setColumnOrder(reorderColumn(column, currentHoveredColumn, columnOrder));
    }
  };

  const handleDragEnter = (_e: DragEvent) => {
    if (!isDragging) {
      setCurrentHoveredColumn(column);
    }
  };

  return (
    <>
      <MenuItem
        disableRipple
        ref={menuItemRef as any}
        onDragEnter={handleDragEnter}
        sx={(theme) => ({
          alignItems: 'center',
          justifyContent: 'flex-start',
          my: 0,
          opacity: isDragging ? 0.5 : 1,
          outline: isDragging
            ? `1px dashed ${theme.palette.divider}`
            : currentHoveredColumn?.id === column.id
            ? `2px dashed ${theme.palette.primary.main}`
            : 'none',
          pl: `${(column.depth + 0.5) * 2}rem`,
          py: '6px',
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '8px',
          }}
        >
          {!isSubMenu &&
            columnDefType !== 'group' &&
            enableColumnOrdering &&
            !allColumns.some(
              (col) => col.columnDef.columnDefType === 'group',
            ) &&
            (columnDef.enableColumnOrdering !== false ? (
              <MRT_GrabHandleButton
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                table={table}
              />
            ) : (
              <Box sx={{ width: '28px' }} />
            ))}
          {!isSubMenu &&
            enablePinning &&
            (column.getCanPin() ? (
              <MRT_ColumnPinningButtons column={column} table={table} />
            ) : (
              <Box sx={{ width: '70px' }} />
            ))}
          {enableHiding ? (
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
              control={
                <Tooltip
                  arrow
                  enterDelay={1000}
                  enterNextDelay={1000}
                  title={localization.toggleVisibility}
                >
                  <Switch />
                </Tooltip>
              }
              disabled={
                (isSubMenu && switchChecked) ||
                !column.getCanHide() ||
                column.getIsGrouped()
              }
              label={columnDef.header}
              onChange={() => handleToggleColumnHidden(column)}
            />
          ) : (
            <Typography sx={{ alignSelf: 'center' }}>
              {columnDef.header}
            </Typography>
          )}
        </Box>
      </MenuItem>
      {column.columns?.map((c: MRT_Column, i) => (
        <MRT_ShowHideColumnsMenuItems
          allColumns={allColumns}
          column={c}
          currentHoveredColumn={currentHoveredColumn}
          isSubMenu={isSubMenu}
          key={`${i}-${c.id}`}
          setCurrentHoveredColumn={setCurrentHoveredColumn}
          table={table}
        />
      ))}
    </>
  );
};
