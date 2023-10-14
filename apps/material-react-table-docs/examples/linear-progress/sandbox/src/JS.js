import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { data } from './makeData';
import { Button } from '@mui/material';

const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  const [progress, setProgress] = useState(0);

  //simulate random progress for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.random() * 20;
        return Math.min(oldProgress + newProgress, 100);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      muiLinearProgressProps={({ isTopToolbar }) => ({
        color: 'secondary',
        variant: 'determinate', //if you want to show exact progress value
        value: progress, //value between 0 and 100
        sx: {
          display: isTopToolbar ? 'block' : 'none', //hide bottom progress bar
        },
      })}
      renderTopToolbarCustomActions={() => (
        <Button onClick={() => setProgress(0)} variant="contained">
          Reset
        </Button>
      )}
      state={{ showProgressBars: true }}
    />
  );
};

export default Example;
