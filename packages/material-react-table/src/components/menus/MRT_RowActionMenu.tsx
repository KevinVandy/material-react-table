import { type MouseEvent } from 'react';
import Menu, { type MenuProps } from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { MRT_MenuItem } from './MRT_MenuItem';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { getMRTTheme } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> extends Partial<MenuProps> {
  anchorEl: HTMLElement | null;
  handleEdit: (event: MouseEvent) => void;
  row: MRT_Row<TData>;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  staticRowIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_RowActionMenu = <TData extends MRT_RowData>({
  anchorEl,
  handleEdit,
  row,
  setAnchorEl,
  staticRowIndex,
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
      renderRowActionMenuItems,
    },
  } = table;
  const { density } = getState();

  const theme = useTheme();
  const { menuBackgroundColor } = getMRTTheme(table, theme);

  return (
    <Menu
      MenuListProps={{
        dense: density === 'compact',
        sx: {
          backgroundColor: menuBackgroundColor,
        },
      }}
      anchorEl={anchorEl}
      disableScrollLock
      onClick={(event) => event.stopPropagation()}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      {...rest}
    >
      {parseFromValuesOrFunc(enableEditing, row) &&
        ['modal', 'row'].includes(editDisplayMode!) && (
          <MRT_MenuItem
            icon={EditIcon}
            label={localization.edit}
            onClick={handleEdit}
          />
        )}
      {renderRowActionMenuItems?.({
        closeMenu: () => setAnchorEl(null),
        row,
        staticRowIndex,
        table,
      })}
    </Menu>
  );
};
