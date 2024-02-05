import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';

export interface MRT_ToggleDensePaddingButtonProps<TData extends MRT_RowData>
  extends IconButtonProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleDensePaddingButton = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_ToggleDensePaddingButtonProps<TData>) => {
  const {
    getState,
    options: {
      icons: { DensityLargeIcon, DensityMediumIcon, DensitySmallIcon },
      localization,
    },
    setDensity,
  } = table;
  const { density } = getState();

  const handleToggleDensePadding = () => {
    const nextDensity =
      density === 'comfortable'
        ? 'compact'
        : density === 'compact'
          ? 'spacious'
          : 'comfortable';
    setDensity(nextDensity);
  };

  return (
    <Tooltip title={rest?.title ?? localization.toggleDensity}>
      <IconButton
        aria-label={localization.toggleDensity}
        onClick={handleToggleDensePadding}
        {...rest}
        title={undefined}
      >
        {density === 'compact' ? (
          <DensitySmallIcon />
        ) : density === 'comfortable' ? (
          <DensityMediumIcon />
        ) : (
          <DensityLargeIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};
