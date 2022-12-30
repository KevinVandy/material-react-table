import React, { Fragment } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import type { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  stackAlertBanner: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarAlertBanner = <TData extends Record<string, any> = {}>({
  stackAlertBanner,
  table,
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getSelectedRowModel,
    getState,
    options: {
      localization,
      muiToolbarAlertBannerProps,
      muiToolbarAlertBannerChipProps,
      positionToolbarAlertBanner,
      rowCount,
    },
  } = table;
  const { grouping, showAlertBanner } = getState();

  const alertProps =
    muiToolbarAlertBannerProps instanceof Function
      ? muiToolbarAlertBannerProps({ table })
      : muiToolbarAlertBannerProps;

  const chipProps =
    muiToolbarAlertBannerChipProps instanceof Function
      ? muiToolbarAlertBannerChipProps({ table })
      : muiToolbarAlertBannerChipProps;

  const selectMessage =
    getSelectedRowModel().rows.length > 0
      ? localization.selectedCountOfRowCountRowsSelected
          ?.replace(
            '{selectedCount}',
            getSelectedRowModel().rows.length.toString(),
          )
          ?.replace(
            '{rowCount}',
            (rowCount ?? getPrePaginationRowModel().rows.length).toString(),
          )
      : null;

  const groupedByMessage =
    grouping.length > 0 ? (
      <span>
        {localization.groupedBy}{' '}
        {grouping.map((columnId, index) => (
          <Fragment key={`${index}-${columnId}`}>
            {index > 0 ? localization.thenBy : ''}
            <Chip
              label={table.getColumn(columnId).columnDef.header}
              onDelete={() => table.getColumn(columnId).toggleGrouping()}
              {...chipProps}
            />
          </Fragment>
        ))}
      </span>
    ) : null;

  return (
    <Collapse
      in={showAlertBanner || !!selectMessage || !!groupedByMessage}
      timeout={stackAlertBanner ? 200 : 0}
    >
      <Alert
        color="info"
        icon={false}
        {...alertProps}
        sx={(theme) => ({
          borderRadius: 0,
          fontSize: '1rem',
          left: 0,
          p: 0,
          position: 'relative',
          mb: stackAlertBanner
            ? 0
            : positionToolbarAlertBanner === 'bottom'
            ? '-1rem'
            : undefined,
          right: 0,
          top: 0,
          width: '100%',
          zIndex: 2,
          ...(alertProps?.sx instanceof Function
            ? alertProps.sx(theme)
            : (alertProps?.sx as any)),
        })}
      >
        {alertProps?.title && <AlertTitle>{alertProps.title}</AlertTitle>}
        <Box sx={{ p: '0.5rem 1rem' }}>
          {alertProps?.children}
          {alertProps?.children && (selectMessage || groupedByMessage) && (
            <br />
          )}
          {selectMessage}
          {selectMessage && groupedByMessage && <br />}
          {groupedByMessage}
        </Box>
      </Alert>
    </Collapse>
  );
};
