import { useEffect, useRef, useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterRangeSlider = <TData extends Record<string, any>>({
  header,
  table,
}: Props<TData>) => {
  const {
    options: { enableColumnFilterModes, localization, muiFilterSliderProps },
    refs: { filterInputRefs },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const currentFilterOption = columnDef._filterFn;

  const showChangeModeButton =
    enableColumnFilterModes && columnDef.enableColumnFilterModes !== false;

  const sliderProps = {
    ...parseFromValuesOrFunc(muiFilterSliderProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiFilterSliderProps, { column, table }),
  };

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
        max={max}
        min={min}
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
          ...(parseFromValuesOrFunc(sliderProps?.sx, theme) as any),
        })}
      />
      {showChangeModeButton ? (
        <FormHelperText
          sx={{
            fontSize: '0.75rem',
            lineHeight: '0.8rem',
            m: '-3px -6px',
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
