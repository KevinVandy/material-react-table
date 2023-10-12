import { Fragment } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import { parseFromValuesOrFunc } from '../column.utils';
import { MRT_SelectCheckbox } from '../inputs';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  stackAlertBanner?: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarAlertBanner = <TData extends Record<string, any>>({
  stackAlertBanner,
  table,
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getSelectedRowModel,
    getState,
    options: {
      enableRowSelection,
      enableSelectAll,
      localization,
      muiToolbarAlertBannerChipProps,
      muiToolbarAlertBannerProps,
      positionToolbarAlertBanner,
      renderToolbarAlertBannerContent,
      rowCount,
    },
    refs: { tablePaperRef },
  } = table;
  const { density, grouping, showAlertBanner } = getState();

  const alertProps = parseFromValuesOrFunc(muiToolbarAlertBannerProps, {
    table,
  });

  const chipProps = parseFromValuesOrFunc(muiToolbarAlertBannerChipProps, {
    table,
  });

  const selectedAlert =
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

  const groupedAlert =
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
      in={showAlertBanner || !!selectedAlert || !!groupedAlert}
      timeout={stackAlertBanner ? 200 : 0}
    >
      <Alert
        color="info"
        icon={false}
        {...alertProps}
        sx={(theme) => ({
          '& .MuiAlert-message': {
            maxWidth: `calc(${
              tablePaperRef.current?.clientWidth ?? 360
            }px - 1rem)`,
            width: '100%',
          },
          borderRadius: 0,
          fontSize: '1rem',
          left: 0,
          mb: stackAlertBanner
            ? 0
            : positionToolbarAlertBanner === 'bottom'
            ? '-1rem'
            : undefined,
          p: 0,
          position: 'relative',
          right: 0,
          top: 0,
          width: '100%',
          zIndex: 2,
          ...(parseFromValuesOrFunc(alertProps?.sx, theme) as any),
        })}
      >
        {renderToolbarAlertBannerContent?.({
          groupedAlert,
          selectedAlert,
          table,
        }) ?? (
          <>
            {alertProps?.title && <AlertTitle>{alertProps.title}</AlertTitle>}
            <Stack
              sx={{
                p:
                  positionToolbarAlertBanner !== 'head-overlay'
                    ? '0.5rem 1rem'
                    : density === 'spacious'
                    ? '0.75rem 1.25rem'
                    : density === 'comfortable'
                    ? '0.5rem 0.75rem'
                    : '0.25rem 0.5rem',
              }}
            >
              {alertProps?.children}
              {alertProps?.children && (selectedAlert || groupedAlert) && (
                <br />
              )}
              <Box sx={{ display: 'flex' }}>
                {enableRowSelection &&
                  enableSelectAll &&
                  positionToolbarAlertBanner === 'head-overlay' && (
                    <MRT_SelectCheckbox selectAll table={table} />
                  )}{' '}
                {selectedAlert}
              </Box>
              {selectedAlert && groupedAlert && <br />}
              {groupedAlert}
            </Stack>
          </>
        )}
      </Alert>
    </Collapse>
  );
};
