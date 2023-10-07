import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination, { type PaginationProps } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_TableInstance } from '../types';

const defaultPageSizeOptions = [5, 10, 15, 20, 25, 30, 50, 100];

interface Props<TData extends Record<string, any> = {}> {
  position?: 'bottom' | 'top';
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePagination = <TData extends Record<string, any> = {}>({
  position = 'bottom',
  table,
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getState,
    options: {
      enableToolbarInternalActions,
      icons: { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon },
      localization,
      muiTablePaginationProps,
      paginationDisplayMode,
      rowCount,
    },
    setPageIndex,
    setPageSize,
  } = table;
  const {
    pagination: { pageIndex = 0, pageSize = 10 },
    showGlobalFilter,
  } = getState();

  const paginationProps = parseFromValuesOrFunc(muiTablePaginationProps, {
    table,
  });

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const numberOfPages = Math.ceil(totalRowCount / pageSize);
  const showFirstLastPageButtons = numberOfPages > 2;
  const showFirstButton =
    showFirstLastPageButtons && paginationProps?.showFirstButton !== false;
  const showLastButton =
    showFirstLastPageButtons && paginationProps?.showLastButton !== false;
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        mt:
          position === 'top' &&
          enableToolbarInternalActions &&
          !showGlobalFilter
            ? '3rem'
            : undefined,
        position: 'relative',
        px: '4px',
        py: '12px',
        zIndex: 2,
      }}
    >
      {paginationProps?.showRowsPerPage !== false && (
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
          <InputLabel htmlFor="mrt-rows-per-page" sx={{ mb: 0 }}>
            {localization.rowsPerPage}
          </InputLabel>
          <Select
            id="mrt-rows-per-page"
            label={localization.rowsPerPage}
            onChange={(event) => setPageSize(+event.target.value)}
            sx={{ '&::before': { border: 'none' }, mb: 0 }}
            value={pageSize}
            variant="standard"
          >
            {defaultPageSizeOptions.map((value) => (
              <MenuItem key={value} sx={{ m: 0 }} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
      {paginationDisplayMode === 'pages' ? (
        <Pagination
          count={numberOfPages}
          onChange={(_e, newPageIndex) => setPageIndex(newPageIndex - 1)}
          page={pageIndex + 1}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                first: FirstPageIcon,
                last: LastPageIcon,
                next: ChevronRightIcon,
                previous: ChevronLeftIcon,
              }}
              {...item}
            />
          )}
          showFirstButton={showFirstButton}
          showLastButton={showLastButton}
          {...(paginationProps as PaginationProps)}
        />
      ) : paginationDisplayMode === 'default' ? (
        <>
          <Typography mb="0" mx="8px" variant="body2">{`${
            lastRowIndex === 0 ? 0 : (firstRowIndex + 1).toLocaleString()
          }-${lastRowIndex.toLocaleString()} ${
            localization.of
          } ${totalRowCount.toLocaleString()}`}</Typography>
          <Box gap="xs">
            {showFirstButton && (
              <IconButton
                aria-label={localization.goToFirstPage}
                disabled={pageIndex <= 0}
                onClick={() => setPageIndex(0)}
                size="small"
              >
                <FirstPageIcon />
              </IconButton>
            )}
            <IconButton
              aria-label={localization.goToPreviousPage}
              disabled={pageIndex <= 0}
              onClick={() => setPageIndex(pageIndex - 1)}
              size="small"
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              aria-label={localization.goToNextPage}
              disabled={lastRowIndex >= totalRowCount}
              onClick={() => setPageIndex(pageIndex + 1)}
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
            {showLastButton && (
              <IconButton
                aria-label={localization.goToLastPage}
                disabled={lastRowIndex >= totalRowCount}
                onClick={() => setPageIndex(numberOfPages - 1)}
                size="small"
              >
                <LastPageIcon />
              </IconButton>
            )}
          </Box>
        </>
      ) : null}
    </Box>
  );
};
