import React, { FC } from 'react';
import {
  Alert as MuiAlert,
  Chip,
  Collapse,
  styled,
  useMediaQuery,
} from '@mui/material';
import { useMRT } from '../useMRT';

const Alert = styled(MuiAlert, {
  shouldForwardProp: (prop) =>
    prop !== 'displayAbsolute' && prop !== 'toolbarPosition',
})<{ displayAbsolute?: boolean; toolbarPosition?: 'top' | 'bottom' }>(
  ({ displayAbsolute, toolbarPosition }) => ({
    borderRadius: 0,
    fontSize: '1rem',
    left: 0,
    marginLeft: !displayAbsolute ? '-0.5rem' : undefined,
    padding: toolbarPosition === 'bottom' ? '0 1rem' : '0.5rem 1.25rem',
    position: displayAbsolute ? 'absolute' : 'relative',
    right: 0,
    top: 0,
    width: `calc(100% - ${displayAbsolute ? '2.5rem' : '1.5rem'})`,
    zIndex: 2,
  }),
);

interface Props {}

export const MRT_ToolbarAlertBanner: FC<Props> = () => {
  const {
    muiTableToolbarAlertBannerProps,
    tableInstance,
    positionToolbarAlertBanner,
    positionToolbarActions,
    localization,
    renderToolbarCustomActions,
  } = useMRT();

  const isMobile = useMediaQuery('(max-width:720px)');

  const alertProps =
    muiTableToolbarAlertBannerProps instanceof Function
      ? muiTableToolbarAlertBannerProps(tableInstance)
      : muiTableToolbarAlertBannerProps;

  const selectMessage =
    tableInstance.selectedFlatRows.length > 0
      ? localization?.toolbarAlertSelectionMessage
          ?.replace(
            '{selectedCount}',
            tableInstance.selectedFlatRows.length.toString(),
          )
          ?.replace('{rowCount}', tableInstance.flatRows.length.toString())
      : null;

  const groupedByMessage =
    tableInstance.state.groupBy.length > 0 ? (
      <span>
        {localization?.toolbarAlertGroupedByMessage}{' '}
        {tableInstance.state.groupBy.map((columnId, index) => (
          <>
            {index > 0 ? localization?.toolbarAlertGroupedThenByMessage : ''}
            <Chip
              color="secondary"
              key={`${index}-${columnId}`}
              label={
                tableInstance.allColumns.find(
                  (column) => column.id === columnId,
                )?.Header
              }
              onDelete={() => tableInstance.toggleGroupBy(columnId, false)}
            />
          </>
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
        displayAbsolute={displayAbsolute}
        icon={false}
        color="info"
        {...alertProps}
      >
        {selectMessage}
        {groupedByMessage}
      </Alert>
    </Collapse>
  );
};
