import Box from '@mui/material/Box';
import CircularProgress, {
  type CircularProgressProps,
} from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import { parseFromValuesOrFunc } from '../column.utils';
import { getMRTTheme } from '../style.utils';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> extends CircularProgressProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_TableLoadingOverlay = <TData extends MRT_RowData>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: { localization, muiCircularProgressProps },
  } = table;

  const circularProgressProps = {
    ...parseFromValuesOrFunc(muiCircularProgressProps, { table }),
    ...rest,
  };

  return (
    <Box
      sx={(theme) => ({
        alignItems: 'center',
        backgroundColor: alpha(
          getMRTTheme(table, theme).baseBackgroundColor,
          0.5,
        ),
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        maxHeight: '100vh',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 2,
      })}
    >
      <CircularProgress
        aria-label={localization.noRecordsToDisplay}
        id="mrt-progress"
        {...circularProgressProps}
      />
    </Box>
  );
};
