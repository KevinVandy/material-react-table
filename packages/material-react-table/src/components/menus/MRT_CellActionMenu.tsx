import Menu, { type MenuProps } from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { MRT_MenuItem } from './MRT_MenuItem';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { getMRTTheme } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> extends Partial<MenuProps> {
  table: MRT_TableInstance<TData>;
}

export const MRT_CellActionMenu = <TData extends MRT_RowData>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      editDisplayMode,
      enableClickToCopy,
      enableEditing,
      icons: { ContentCopy, EditIcon },
      localization,
      renderCellActionMenuItems,
    },
    refs: { actionCellRef },
  } = table;
  const { actionCell, density } = getState();
  const cell = actionCell!;
  const { row } = cell;
  const { column } = cell;
  const { columnDef } = column;

  const theme = useTheme();
  const { menuBackgroundColor } = getMRTTheme(table, theme);

  const handleClose = (event?: any) => {
    event?.stopPropagation();
    table.setActionCell(null);
    actionCellRef.current = null;
  };

  const internalMenuItems = [
    (parseFromValuesOrFunc(enableClickToCopy, cell) === 'context-menu' ||
      parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) ===
        'context-menu') && (
      <MRT_MenuItem
        divider
        icon={ContentCopy}
        label={localization.copy}
        onClick={(event) => {
          event.stopPropagation();
          navigator.clipboard.writeText(cell.getValue() as string);
        }}
      />
    ),
    parseFromValuesOrFunc(enableEditing, row) && editDisplayMode === 'cell' && (
      <MRT_MenuItem
        divider
        icon={EditIcon}
        label={localization.edit}
        onClick={() => {
          table.setEditingCell(cell!);
        }}
      />
    ),
    renderCellActionMenuItems?.({
      cell: cell!,
      closeMenu: handleClose,
      column: column,
      row,
      table,
    }),
  ].filter(Boolean);

  return (
    !!internalMenuItems.length && (
      <Menu
        MenuListProps={{
          dense: density === 'compact',
          sx: {
            backgroundColor: menuBackgroundColor,
          },
        }}
        anchorEl={actionCellRef.current}
        disableScrollLock
        onClick={(event) => event.stopPropagation()}
        onClose={handleClose}
        open={!!cell}
        transformOrigin={{ horizontal: -100, vertical: 8 }}
        {...rest}
      >
        {internalMenuItems}
      </Menu>
    )
  );
};
