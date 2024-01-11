import { type MouseEvent } from 'react';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends IconButtonProps {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ExpandButton = <TData extends MRT_RowData>({
  row,
  table,
}: Props<TData>) => {
  const theme = useTheme();
  const {
    getState,
    options: {
      icons: { ExpandMoreIcon },
      localization,
      muiExpandButtonProps,
      positionExpandColumn,
      renderDetailPanel,
    },
  } = table;
  const { density } = getState();

  const iconButtonProps = parseFromValuesOrFunc(muiExpandButtonProps, {
    row,
    table,
  });

  const canExpand = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    row.toggleExpanded();
    iconButtonProps?.onClick?.(event);
  };

  const detailPanel = !!renderDetailPanel?.({ row, table });

  return (
    <Tooltip
      disableHoverListener={!canExpand && !detailPanel}
      enterDelay={1000}
      enterNextDelay={1000}
      title={
        iconButtonProps?.title ??
        (isExpanded ? localization.collapse : localization.expand)
      }
    >
      <span>
        <IconButton
          aria-label={localization.expand}
          disabled={!canExpand && !detailPanel}
          {...iconButtonProps}
          onClick={handleToggleExpand}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            opacity: !canExpand && !detailPanel ? 0.3 : 1,
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            ...(parseFromValuesOrFunc(iconButtonProps?.sx, theme) as any),
          })}
          title={undefined}
        >
          {iconButtonProps?.children ?? (
            <ExpandMoreIcon
              style={{
                transform: `rotate(${
                  !canExpand && !renderDetailPanel
                    ? positionExpandColumn === 'last' ||
                      theme.direction === 'rtl'
                      ? 90
                      : -90
                    : isExpanded
                      ? -180
                      : 0
                }deg)`,
                transition: 'transform 150ms',
              }}
            />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};
