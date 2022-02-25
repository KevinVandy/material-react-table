import React, { FC, MouseEvent, useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  Tooltip,
  styled,
  Divider,
  IconButtonProps,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { useMRT } from '../useMRT';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';

const MenuButtons = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0.5rem 0.5rem 0.5rem',
});

interface Props extends IconButtonProps {}

export const MRT_ShowHideColumnsButton: FC<Props> = ({ ...rest }) => {
  const { tableInstance, localization } = useMRT();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization?.showHideColumnsButtonTitle ?? ''}>
        <IconButton
          aria-label={localization?.showHideColumnsButtonTitle}
          onClick={handleClick}
          size="small"
          {...rest}
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuButtons>
          <Button
            disabled={
              !tableInstance.getToggleHideAllColumnsProps().checked &&
              !tableInstance.getToggleHideAllColumnsProps().indeterminate
            }
            onClick={() => tableInstance.toggleHideAllColumns(true)}
          >
            {localization?.columnShowHideMenuHideAll}
          </Button>
          <Button
            disabled={tableInstance.getToggleHideAllColumnsProps().checked}
            onClick={() => tableInstance.toggleHideAllColumns(false)}
          >
            {localization?.columnShowHideMenuShowAll}
          </Button>
        </MenuButtons>
        <Divider />
        {tableInstance.columns.map((column, index) => (
          <MRT_ShowHideColumnsMenu
            key={`${index}-${column.id}`}
            column={column}
          />
        ))}
      </Menu>
    </>
  );
};
