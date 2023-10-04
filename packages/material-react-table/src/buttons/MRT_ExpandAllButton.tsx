import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ExpandAllButton = <TData extends Record<string, any>>({
  table,
}: Props<TData>) => {
  const {
    getCanSomeRowsExpand,
    getIsAllRowsExpanded,
    getIsSomeRowsExpanded,
    getState,
    options: {
      icons: { KeyboardDoubleArrowDownIcon },
      localization,
      muiExpandAllButtonProps,
      renderDetailPanel,
    },
    toggleAllRowsExpanded,
  } = table;
  const { density, isLoading } = getState();

  const iconButtonProps = parseFromValuesOrFunc(muiExpandAllButtonProps, {
    table,
  });

  const isAllRowsExpanded = getIsAllRowsExpanded();

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={
        iconButtonProps?.title ?? isAllRowsExpanded
          ? localization.collapseAll
          : localization.expandAll
      }
    >
      <span>
        <IconButton
          aria-label={localization.expandAll}
          disabled={
            isLoading || (!renderDetailPanel && !getCanSomeRowsExpand())
          }
          onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
          {...iconButtonProps}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            mt: density !== 'compact' ? '-0.25rem' : undefined,
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            ...(parseFromValuesOrFunc(iconButtonProps?.sx, theme) as any),
          })}
          title={undefined}
        >
          {iconButtonProps?.children ?? (
            <KeyboardDoubleArrowDownIcon
              style={{
                transform: `rotate(${
                  isAllRowsExpanded ? -180 : getIsSomeRowsExpanded() ? -90 : 0
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
