import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';
import { Link as MuiLink, useTheme } from '@mui/material';
import { PropRow, rootProps } from './rootProps';

interface Props {
  onlyProps?: Set<keyof MaterialReactTableProps>;
}

const RootPropTable: FC<Props> = ({ onlyProps }) => {
  const theme = useTheme();

  const columns = useMemo(
    () =>
      [
        {
          enableClickToCopy: true,
          header: 'Prop Name',
          accessorKey: 'propName',
          Cell: ({ cell }) =>
            cell.row.original?.required ? (
              <strong style={{ color: theme.palette.primary.dark }}>
                <>{cell.getValue()}*</>
              </strong>
            ) : (
              cell.getValue()
            ),
        },
        { header: 'Type', accessorKey: 'type', enableGlobalFilter: false },
        {
          header: 'Required',
          accessorKey: 'required',
          enableGlobalFilter: false,
        },
        {
          header: 'Default Value',
          accessorKey: 'defaultValue',
          enableGlobalFilter: false,
        },
        {
          header: 'Description',
          accessorKey: 'description',
          enableGlobalFilter: false,
        },
        {
          header: 'More Info Links',
          accessorKey: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          Cell: ({ cell }) => (
            <Link href={cell.getValue() as string} passHref>
              <MuiLink
                target={
                  (cell.getValue() as string).startsWith('http')
                    ? '_blank'
                    : undefined
                }
                rel="noreferrer"
              >
                {cell.row.original?.linkText}
              </MuiLink>
            </Link>
          ),
        },
        { header: 'Source', accessorKey: 'source', enableGlobalFilter: false },
      ] as MRT_ColumnDef<PropRow>[],
    [theme],
  );

  const data = useMemo(() => {
    if (onlyProps) {
      return rootProps.filter(({ propName }) => onlyProps.has(propName));
    }
    return rootProps;
  }, [onlyProps]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnActions={!onlyProps}
      enableColumnOrdering={!onlyProps}
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableToolbarBottom={false}
      enableToolbarTop={!onlyProps}
      initialState={{
        columnVisibility: { required: false },
        density: 'compact',
        showGlobalFilter: true,
        sorting: [
          { id: 'required', desc: true },
          { id: 'propName', desc: false },
        ],
        columnPinning: { left: ['mrt-row-numbers', 'propName'], right: [] },
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search All Props',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      muiTablePaperProps={{ sx: { mb: '1.5rem' } }}
      positionGlobalFilter="left"
      rowNumberMode="static"
    />
  );
};

export default RootPropTable;
