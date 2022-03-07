import React, { ChangeEvent, FC, MouseEvent, useState } from 'react';
import {
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from '@mui/material';
import { useAsyncDebounce } from 'react-table';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';
import { MRT_FilterTypeMenu } from '../menus/MRT_FilterTypeMenu';

interface Props {
  column: MRT_HeaderGroup;
}

export const MRT_FilterTextField: FC<Props> = ({ column }) => {
  const {
    icons: { FilterListIcon, CloseIcon },
    idPrefix,
    localization,
    muiTableHeadCellFilterTextFieldProps,
    setCurrentFilterTypes,
    tableInstance,
  } = useMRT();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const mTableHeadCellFilterTextFieldProps =
    muiTableHeadCellFilterTextFieldProps instanceof Function
      ? muiTableHeadCellFilterTextFieldProps(column)
      : muiTableHeadCellFilterTextFieldProps;

  const mcTableHeadCellFilterTextFieldProps =
    column.muiTableHeadCellFilterTextFieldProps instanceof Function
      ? column.muiTableHeadCellFilterTextFieldProps(column)
      : column.muiTableHeadCellFilterTextFieldProps;

  const textFieldProps = {
    ...mTableHeadCellFilterTextFieldProps,
    ...mcTableHeadCellFilterTextFieldProps,
    style: {
      ...mTableHeadCellFilterTextFieldProps?.style,
      ...mcTableHeadCellFilterTextFieldProps?.style,
    },
  } as TextFieldProps;

  const [filterValue, setFilterValue] = useState('');

  const handleChange = useAsyncDebounce((value) => {
    column.setFilter(value ?? undefined);
  }, 150);

  const handleFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClear = () => {
    setFilterValue('');
    column.setFilter(undefined);
  };

  const handleClearFilterChip = () => {
    setFilterValue('');
    column.setFilter(undefined);
    setCurrentFilterTypes((prev) => ({ ...prev, [column.id]: 'fuzzy' }));
  };

  if (column.Filter) {
    return <>{column.Filter?.({ column })}</>;
  }

  const filterType = tableInstance.state.currentFilterTypes[column.id];
  const filterChipLabel = ['empty', 'notEmpty'].includes(filterType);
  const filterPlaceholder = localization.filterTextFieldPlaceholder?.replace(
    '{column}',
    String(column.Header),
  );

  return (
    <>
      <TextField
        fullWidth
        id={`mrt-${idPrefix}-${column.id}-filter-text-field`}
        inputProps={{
          sx: {
            textOverflow: 'ellipsis',
          },
          title: filterPlaceholder,
        }}
        margin="none"
        placeholder={filterChipLabel ? '' : filterPlaceholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFilterValue(e.target.value);
          handleChange(e.target.value);
        }}
        onClick={(e) => e.stopPropagation()}
        value={filterValue ?? ''}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip arrow title="Change Filter Mode">
                <IconButton
                  onClick={handleFilterMenuOpen}
                  size="small"
                  sx={{ height: '1.75rem', width: '1.75rem' }}
                >
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              {filterChipLabel && (
                <Chip onDelete={handleClearFilterChip} label={filterType} />
              )}
            </InputAdornment>
          ),
          endAdornment: !filterChipLabel && (
            <InputAdornment position="end">
              <Tooltip
                arrow
                placement="right"
                title={localization.filterTextFieldClearButtonTitle ?? ''}
              >
                <span>
                  <IconButton
                    aria-label={localization.filterTextFieldClearButtonTitle}
                    disabled={filterValue?.length === 0}
                    onClick={handleClear}
                    size="small"
                    sx={{ height: '1.75rem', width: '1.75rem' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
        sx={{
          m: '0 -0.25rem',
          minWidth: '5rem',
          width: 'calc(100% + 0.5rem)',
          ...textFieldProps?.sx,
        }}
      />
      <MRT_FilterTypeMenu
        anchorEl={anchorEl}
        column={column}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};
