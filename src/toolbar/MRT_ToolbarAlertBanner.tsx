import React, { FC, Fragment } from 'react';
import { Alert, Box, Chip, Collapse } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  stackAlertBanner?: boolean;
  tableInstance: MRT_TableInstance;
}

export const MRT_ToolbarAlertBanner: FC<Props> = ({
  stackAlertBanner,
  tableInstance,
}) => {
  const {
    getPrePaginationRowModel,
    getSelectedRowModel,
    getState,
    options: { localization, muiTableToolbarAlertBannerProps },
  } = tableInstance;

  const { grouping } = getState();

  const alertProps =
    muiTableToolbarAlertBannerProps instanceof Function
      ? muiTableToolbarAlertBannerProps({ tableInstance })
      : muiTableToolbarAlertBannerProps;

  const selectMessage =
    getSelectedRowModel().rows.length > 0
      ? localization.selectedCountOfRowCountRowsSelected
          ?.replace(
            '{selectedCount}',
            getSelectedRowModel().rows.length.toString(),
          )
          ?.replace(
            '{rowCount}',
            getPrePaginationRowModel().rows.length.toString(),
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
              color="secondary"
              label={tableInstance.getColumn(columnId).columnDef.header}
              onDelete={() =>
                tableInstance.getColumn(columnId).toggleGrouping()
              }
            />
          </Fragment>
        ))}
      </span>
    ) : null;

  return (
    <Collapse
      in={!!selectMessage || !!groupedByMessage}
      timeout={stackAlertBanner ? 200 : 0}
    >
      <Alert
        color="info"
        icon={false}
        sx={{
          borderRadius: 0,
          fontSize: '1rem',
          left: 0,
          p: 0,
          position: 'relative',
          right: 0,
          top: 0,
          width: '100%',
          zIndex: 2,
          ...alertProps?.sx,
        }}
        {...alertProps}
      >
        <Box sx={{ p: '0.5rem 1rem' }}>
          {selectMessage}
          {selectMessage && groupedByMessage && <br />}
          {groupedByMessage}
        </Box>
      </Alert>
    </Collapse>
  );
};
