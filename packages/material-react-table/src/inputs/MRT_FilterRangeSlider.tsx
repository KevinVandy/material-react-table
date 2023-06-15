import { FormHelperText, Slider, SliderProps, Stack } from '@mui/material';
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

  const [min, max] =
    sliderProps.min !== undefined && sliderProps.max !== undefined
      ? [sliderProps.min, sliderProps.max]
      : column.getFacetedMinMaxValues() ?? [0, 0];
  const [filterValues, setFilterValues] = useState([min, max]);
  const columnFilterValue = column.getFilterValue();

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (columnFilterValue === undefined) {
        setFilterValues([min, max]);
      } else if (Array.isArray(columnFilterValue)) {
        if (columnFilterValue[0] <= min && columnFilterValue[1] >= max) {
          column.setFilterValue(undefined);
        } else {
          setFilterValues(columnFilterValue);
        }
      }
    }
    isMounted.current = true;
  }, [column.getFilterValue()]);

  return (
    <Stack>
      <Slider
        disableSwap
        min={min}
        max={max}
        onChange={(_event, value) => {
          setFilterValues(value as [number, number]);
        }}
        onChangeCommitted={(_event, value) => {
          column.setFilterValue(value as [number, number]);
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
