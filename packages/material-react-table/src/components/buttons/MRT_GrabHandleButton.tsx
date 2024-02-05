import { type DragEventHandler } from 'react';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { getCommonTooltipProps } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_GrabHandleButtonProps<TData extends MRT_RowData>
  extends IconButtonProps {
  iconButtonProps?: IconButtonProps;
  location?: 'column' | 'row';
  onDragEnd: DragEventHandler<HTMLButtonElement>;
  onDragStart: DragEventHandler<HTMLButtonElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_GrabHandleButton = <TData extends MRT_RowData>({
  location,
  table,
  ...rest
}: MRT_GrabHandleButtonProps<TData>) => {
  const {
    options: {
      icons: { DragHandleIcon },
      localization,
    },
  } = table;

  return (
    <Tooltip
      {...getCommonTooltipProps('top')}
      title={rest?.title ?? localization.move}
    >
      <IconButton
        aria-label={rest.title ?? localization.move}
        disableRipple
        draggable="true"
        size="small"
        {...rest}
        onClick={(e) => {
          e.stopPropagation();
          rest?.onClick?.(e);
        }}
        sx={(theme) => ({
          '&:active': {
            cursor: 'grabbing',
          },
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: 1,
          },
          cursor: 'grab',
          m: '0 -0.1rem',
          opacity: location === 'row' ? 1 : 0.5,
          p: '2px',
          transition: 'all 150ms ease-in-out',
          ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
        })}
        title={undefined}
      >
        <DragHandleIcon />
      </IconButton>
    </Tooltip>
  );
};
