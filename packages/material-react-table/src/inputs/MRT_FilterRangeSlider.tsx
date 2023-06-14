import { Slider, SliderProps } from '@mui/material';
import { type MRT_TableInstance, type MRT_Header } from '../types';
import { useEffect, useRef, useState } from 'react';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_FilterRangeSlider = ({ header, table }: Props) => {
  const {
    options: { muiTableHeadCellFilterSliderProps },
    refs: { filterInputRefs },
  } = table;
  const { column } = header;
  const { columnDef } = column;

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

  const [min, max] = column.getFacetedMinMaxValues() ?? [0, 0];
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
  }, [column.getFilterValue()]);

  return (
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
        mt: '10px',
        pb: '0',
        width: 'calc(100% - 4px)',
        ...(sliderProps?.sx instanceof Function
          ? sliderProps.sx(theme)
          : (sliderProps?.sx as any)),
      })}
    />
  );
};
