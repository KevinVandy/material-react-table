import Slider, { type SliderProps } from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import { type MRT_TableInstance, type MRT_Header } from '../types';
import { useEffect, useRef, useState } from 'react';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_FilterRangeSlider = ({ header, table }: Props) => {
  const {
    options: {
      localization,
      muiTableHeadCellFilterSliderProps,
      enableColumnFilterModes,
    },
    refs: { filterInputRefs },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const currentFilterOption = columnDef._filterFn;

  const showChangeModeButton =
    enableColumnFilterModes && columnDef.enableColumnFilterModes !== false;

  const mTableHeadCellFilterTextFieldProps =
    muiTableHeadCellFilterSliderProps instanceof Function
      ? muiTableHeadCellFilterSliderProps({
          column,
          table,
        })
      : muiTableHeadCellFilterSliderProps;

  const mcTableHeadCellFilterTextFieldProps =
    columnDef.muiTableHeadCellFilterSliderProps instanceof Function
      ? columnDef.muiTableHeadCellFilterSliderProps({
          column,
          table,
        })
      : columnDef.muiTableHeadCellFilterSliderProps;

  const sliderProps = {
    ...mTableHeadCellFilterTextFieldProps,
    ...mcTableHeadCellFilterTextFieldProps,
  } as SliderProps;

  let [min, max] =
    sliderProps.min !== undefined && sliderProps.max !== undefined
      ? [sliderProps.min, sliderProps.max]
      : column.getFacetedMinMaxValues() ?? [0, 1];

  //fix potential TanStack Table bugs where min or max is an array
  if (Array.isArray(min)) min = min[0];
  if (Array.isArray(max)) max = max[0];
  if (min === null) min = 0;
  if (max === null) max = 1;

  const [filterValues, setFilterValues] = useState([min, max]);
  const columnFilterValue = column.getFilterValue();

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (columnFilterValue === undefined) {
        setFilterValues([min, max]);
      } else if (Array.isArray(columnFilterValue)) {
        setFilterValues(columnFilterValue);
      }
    }
    isMounted.current = true;
  }, [columnFilterValue, min, max]);

  return (
    <Stack>
      <Slider
        disableSwap
        min={min}
        max={max}
        onChange={(_event, values) => {
          setFilterValues(values as [number, number]);
        }}
        onChangeCommitted={(_event, value) => {
          if (Array.isArray(value)) {
            if (value[0] <= min && value[1] >= max) {
              //if the user has selected the entire range, remove the filter
              column.setFilterValue(undefined);
            } else {
              column.setFilterValue(value as [number, number]);
            }
          }
        }}
        value={filterValues}
        valueLabelDisplay="auto"
        {...sliderProps}
        slotProps={{
          input: {
            ref: (node) => {
              if (node) {
                filterInputRefs.current[`${column.id}-0`] = node;
                // @ts-ignore
                if (sliderProps?.slotProps?.input?.ref) {
                  //@ts-ignore
                  sliderProps.slotProps.input.ref = node;
                }
              }
            },
          },
        }}
        sx={(theme) => ({
          m: 'auto',
          mt: !showChangeModeButton ? '10px' : '6px',
          px: '4px',
          width: 'calc(100% - 8px)',
          ...(sliderProps?.sx instanceof Function
            ? sliderProps.sx(theme)
            : (sliderProps?.sx as any)),
        })}
      />
      {showChangeModeButton ? (
        <FormHelperText
          sx={{
            m: '-3px -6px',
            fontSize: '0.75rem',
            lineHeight: '0.8rem',
            whiteSpace: 'nowrap',
          }}
        >
          {localization.filterMode.replace(
            '{filterType}',
            // @ts-ignore
            localization[
              `filter${
                currentFilterOption?.charAt(0)?.toUpperCase() +
                currentFilterOption?.slice(1)
              }`
            ],
          )}
        </FormHelperText>
      ) : null}
    </Stack>
  );
};
