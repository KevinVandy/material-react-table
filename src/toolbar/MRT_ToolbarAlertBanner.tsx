import React, { FC, Fragment } from 'react';
import { Alert, Box, Chip, Collapse, useMediaQuery } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_ToolbarAlertBanner: FC<Props> = () => {
  const {
    localization,
    muiTableToolbarAlertBannerProps,
    positionToolbarActions,
    positionToolbarAlertBanner,
    renderToolbarCustomActions,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const isMobile = useMediaQuery('(max-width:720px)');

  const alertProps =
    muiTableToolbarAlertBannerProps instanceof Function
      ? muiTableToolbarAlertBannerProps(tableInstance)
      : muiTableToolbarAlertBannerProps;

  const selectMessage =
    tableInstance.getSelectedRowModel().rows.length > 0
      ? localization.selectedCountOfRowCountRowsSelected
          ?.replace(
            '{selectedCount}',
            tableInstance.getSelectedRowModel().rows.length.toString(),
          )
          ?.replace('{rowCount}', tableInstance.getSelectedRowModel().rows.length.toString())
      : null;

  const groupedByMessage =
    getState().grouping.length > 0 ? (
      <span>
        {localization.groupedBy}{' '}
        {getState().grouping.map((columnId, index) => (
          <Fragment key={`${index}-${columnId}`}>
            {index > 0 ? localization.thenBy : ''}
            <Chip
              color="secondary"
              label={
                tableInstance.getAllColumns().find(
                  (column) => column.id === columnId,
                )?.header
              }
              onDelete={() => tableInstance.toggleColumnGrouping(columnId)}
            />
          </Fragment>
        ))}
      </span>
    ) : null;

  const displayAbsolute = !(
    isMobile ||
    (positionToolbarAlertBanner === 'bottom' &&
      positionToolbarActions === 'bottom') ||
    (positionToolbarAlertBanner === 'top' && !!renderToolbarCustomActions)
  );

  return (
    <Collapse
      in={!!selectMessage || !!groupedByMessage}
      timeout={displayAbsolute ? 0 : 200}
    >
      <Alert
        color="info"
        icon={false}
        sx={{
          borderRadius: 0,
          fontSize: '1rem',
          left: 0,
          p: 0,
          position: displayAbsolute ? 'absolute' : 'relative',
          right: 0,
          minHeight: '3.5rem',
          top: 0,
          width: '100%',
          zIndex: 2,
          ...alertProps?.sx,
        }}
        {...alertProps}
      >
        <Box sx={{ p: '0.5rem 1rem' }}>
          {selectMessage}
          {groupedByMessage}
        </Box>
      </Alert>
    </Collapse>
  );
};
