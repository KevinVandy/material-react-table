import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Divider, MenuItem } from '@mui/material';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        renderColumnActionsMenuItems: ({ closeMenu }) => [
          <MenuItem
            key={1}
            onClick={() => {
              console.log('Item 1 clicked');
              closeMenu();
            }}
          >
            Item 1
          </MenuItem>,
          <MenuItem
            key={2}
            onClick={() => {
              console.log('Item 2 clicked');
              closeMenu();
            }}
          >
            Item 2
          </MenuItem>,
        ],
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        renderColumnActionsMenuItems: ({
          closeMenu,
          internalColumnMenuItems,
        }) => [
          ...internalColumnMenuItems,
          <Divider key="divider-1" />,
          <MenuItem
            key={'item-1'}
            onClick={() => {
              console.log('Item 1 clicked');
              closeMenu();
            }}
          >
            Item 1
          </MenuItem>,
          <MenuItem
            key={'item-2'}
            onClick={() => {
              console.log('Item 2 clicked');
              closeMenu();
            }}
          >
            Item 2
          </MenuItem>,
        ],
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        renderColumnActionsMenuItems: ({
          closeMenu,
          internalColumnMenuItems,
        }) => [
          <MenuItem
            key={'item-1'}
            onClick={() => {
              console.log('Item 1 clicked');
              closeMenu();
            }}
          >
            Item 1
          </MenuItem>,
          <MenuItem
            key={'item-2'}
            onClick={() => {
              console.log('Item 2 clicked');
              closeMenu();
            }}
          >
            Item 2
          </MenuItem>,
          <Divider key="divider-1" />,
          ...internalColumnMenuItems.splice(0, 3),
        ],
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    //or you could define the menu items here for all columns
    // renderColumnActionsMenuItems: ({ closeMenu }) => [],
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
