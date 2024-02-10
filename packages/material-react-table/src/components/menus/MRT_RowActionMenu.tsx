import { type MouseEvent } from 'react';
import Menu, { type MenuProps } from '@mui/material/Menu';
import { MRT_ActionMenuItem } from './MRT_ActionMenuItem';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_RowActionMenuProps<TData extends MRT_RowData>
  extends Partial<MenuProps> {
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
}: MRT_RowActionMenuProps<TData>) => {
  const {
    getState,
    options: {
      editDisplayMode,
      enableEditing,
      icons: { EditIcon },
      localization,
      mrtTheme: { menuBackgroundColor },
      renderRowActionMenuItems,
    },
  } = table;
  const { density } = getState();

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
          <MRT_ActionMenuItem
            icon={<EditIcon />}
            label={localization.edit}
            onClick={handleEdit}
            table={table}
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
