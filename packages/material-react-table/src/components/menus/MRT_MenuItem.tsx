import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import {
  commonListItemStyles,
  commonMenuItemStyles,
} from './MRT_ColumnActionMenu';

interface Props extends MenuItemProps {
  icon: React.ReactNode;
  label: string;
}

export const MRT_MenuItem = ({ icon, label, ...rest }: Props) => {
  return (
    <MenuItem sx={commonMenuItemStyles} {...rest}>
      <Box sx={commonListItemStyles}>
        <ListItemIcon>{icon}</ListItemIcon>
        {label}
      </Box>
    </MenuItem>
  );
};
