import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { data } from './makeData';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';

const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Salary',
        accessorKey: 'salary',
      },
    ],
    [],
    //end
  );

  //demo state
  const [groupedColumnMode, setGroupedColumnMode] = useState('reorder'); //default is 'reorder

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    groupedColumnMode,
    initialState: {
      expanded: true, //expand all groups by default
      grouping: ['state', 'gender'], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    muiTableContainerProps: { sx: { maxHeight: '800px' } },
  });

  return (
    <Stack gap="1rem">
      <DemoRadioGroup
        groupedColumnMode={groupedColumnMode}
        setGroupedColumnMode={setGroupedColumnMode}
      />
      <MaterialReactTable table={table} />
    </Stack>
  );
};

export default Example;

//demo...
const DemoRadioGroup = ({ groupedColumnMode, setGroupedColumnMode }) => {
  return (
    <FormControl sx={{ margin: 'auto', textAlign: 'center' }}>
      <FormLabel>Grouped Column Mode</FormLabel>
      <RadioGroup
        row
        value={groupedColumnMode}
        onChange={(event) =>
          setGroupedColumnMode(
            event.target.value === 'false' ? false : event.target.value,
          )
        }
      >
        <FormControlLabel
          control={<Radio />}
          label='"reorder" (default)'
          value="reorder"
        />
        <FormControlLabel control={<Radio />} label='"remove"' value="remove" />
        <FormControlLabel value={false} control={<Radio />} label="false" />
      </RadioGroup>
    </FormControl>
  );
};
//end
