import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu, { type MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useTheme } from '@mui/material/styles';
import {
  commonListItemStyles,
  commonMenuItemStyles,
} from './MRT_ColumnActionMenu';
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
      enableEditing,
      icons: { EditIcon },
      localization,
      renderCellActionMenuItems,
      renderCellActions,
    },
    refs: { actionCellRef },
  } = table;
  const { actionCell, density } = getState();
  const cell = actionCell!;
  const { row } = cell;

  const theme = useTheme();
  const { menuBackgroundColor } = getMRTTheme(table, theme);

  const handleClose = (event?: any) => {
    event?.stopPropagation();
    table.setActionCell(null);
    actionCellRef.current = null;
  };

  const cellActionsPopoverContent = renderCellActions?.({
    cell: actionCell!,
    row,
    table,
  });

  const menuItems = [
    parseFromValuesOrFunc(enableEditing, row) && editDisplayMode === 'cell' && (
      <MenuItem
        onClick={() => {
          table.setEditingCell(actionCell!);
        }}
        sx={commonMenuItemStyles}
      >
        <Box sx={commonListItemStyles}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          {localization.edit}
        </Box>
      </MenuItem>
    ),
    renderCellActionMenuItems?.({
      cell: actionCell!,
      closeMenu: handleClose,
      row,
      table,
    }),
  ].filter(Boolean);

  return (
    <>
      {!!cellActionsPopoverContent && (
        <Popover
          anchorEl={actionCellRef.current}
          onClick={(event) => event.stopPropagation()}
          onClose={handleClose}
          open={true}
          slotProps={{ paper: { sx: { overflow: 'visible' } } }}
          transformOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
        >
          {cellActionsPopoverContent}
        </Popover>
      )}
      hello
      {!!menuItems.length && (
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
          open={!!actionCell}
          transformOrigin={{ horizontal: -100, vertical: 8 }}
          {...rest}
        >
          {menuItems}
        </Menu>
      )}
    </>
  );
};
