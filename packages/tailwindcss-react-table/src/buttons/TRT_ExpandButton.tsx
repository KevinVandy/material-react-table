import React, { MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type {
  TRT_Row,
  TRT_TableInstance,
} from '../TailwindCSSReactTable.types';

interface Props<TData extends Record<string, any> = {}> {
  row: TRT_Row<TData>;
  table: TRT_TableInstance<TData>;
}

export const TRT_ExpandButton = <TData extends Record<string, any> = {}>({
  row,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { ExpandMoreIcon },
      localization,
      expandButtonProps,
      renderDetailPanel,
    },
  } = table;
  const { density } = getState();

  const iconButtonProps =
    expandButtonProps instanceof Function
      ? expandButtonProps({ table, row })
      : expandButtonProps;

  const canExpand = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    row.toggleExpanded();
    iconButtonProps?.onClick?.(event);
  };

  return (
    <Tooltip
      arrow
      disableHoverListener={!canExpand && !renderDetailPanel}
      enterDelay={1000}
      enterNextDelay={1000}
      title={
        iconButtonProps?.title ?? isExpanded
          ? localization.collapse
          : localization.expand
      }
    >
      <span>
        <IconButton
          aria-label={localization.expand}
          disabled={!canExpand && !renderDetailPanel}
          {...iconButtonProps}
          onClick={handleToggleExpand}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            ...(iconButtonProps?.sx instanceof Function
              ? iconButtonProps.sx(theme)
              : (iconButtonProps?.sx as any)),
          })}
          title={undefined}
        >
          {iconButtonProps?.children ?? (
            <ExpandMoreIcon
              style={{
                transform: `rotate(${
                  !canExpand && !renderDetailPanel ? -90 : isExpanded ? -180 : 0
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
