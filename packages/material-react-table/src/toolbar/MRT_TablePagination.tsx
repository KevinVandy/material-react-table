import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination, { type PaginationProps } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select, { type SelectProps } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { parseFromValuesOrFunc } from '../column.utils';
import { flipIconStyles } from '../style.utils';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

const defaultRowsPerPage = [5, 10, 15, 20, 25, 30, 50, 100];

interface Props<TData extends MRT_RowData>
  extends Partial<
    PaginationProps & {
      SelectProps?: Partial<SelectProps>;
      disabled?: boolean;
      rowsPerPageOptions?: { label: string; value: number }[] | number[];
      showRowsPerPage?: boolean;
    }
  > {
  position?: 'bottom' | 'top';
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePagination = <TData extends MRT_RowData>({
  position = 'bottom',
  table,
  ...rest
}: Props<TData>) => {
  const theme = useTheme();

  const {
    getPrePaginationRowModel,
    getState,
    options: {
      enableToolbarInternalActions,
      icons: { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon },
      localization,
      muiPaginationProps,
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

  const paginationProps = {
    ...parseFromValuesOrFunc(muiPaginationProps, {
      table,
    }),
    ...rest,
  };

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const numberOfPages = Math.ceil(totalRowCount / pageSize);
  const showFirstLastPageButtons = numberOfPages > 2;
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);

  const {
    SelectProps,
    disabled = false,
    rowsPerPageOptions = defaultRowsPerPage,
    showFirstButton = showFirstLastPageButtons,
    showLastButton = showFirstLastPageButtons,
    showRowsPerPage = true,
    ..._rest
  } = paginationProps ?? {};

  const disableBack = pageIndex <= 0 || disabled;
  const disableNext = lastRowIndex >= totalRowCount || disabled;

  return (
    <Box
      className="MuiTablePagination-root"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        justifyContent: { md: 'space-between', sm: 'center' },
        justifySelf: 'flex-end',
        mt:
          position === 'top' &&
          enableToolbarInternalActions &&
          !showGlobalFilter
            ? '3rem'
            : undefined,
        position: 'relative',
        px: '8px',
        py: '12px',
        zIndex: 2,
      }}
    >
      {showRowsPerPage && (
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
          <InputLabel htmlFor="mrt-rows-per-page" sx={{ mb: 0 }}>
            {localization.rowsPerPage}
          </InputLabel>
          <Select
            disableUnderline
            disabled={disabled}
            id="mrt-rows-per-page"
            inputProps={{ 'aria-label': localization.rowsPerPage }}
            label={localization.rowsPerPage}
            onChange={(event) => setPageSize(+(event.target.value as any))}
            sx={{ mb: 0 }}
            value={pageSize}
            variant="standard"
            {...SelectProps}
          >
            {rowsPerPageOptions.map((option) => {
              const value = typeof option !== 'number' ? option.value : option;
              const label =
                typeof option !== 'number' ? option.label : `${option}`;
              return (
                SelectProps?.children ??
                (SelectProps?.native ? (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ) : (
                  <MenuItem key={value} sx={{ m: 0 }} value={value}>
                    {label}
                  </MenuItem>
                ))
              );
            })}
          </Select>
        </Box>
      )}
      {paginationDisplayMode === 'pages' ? (
        <Pagination
          count={numberOfPages}
          disabled={disabled}
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
          {..._rest}
        />
      ) : paginationDisplayMode === 'default' ? (
        <>
          <Typography
            align="center"
            component="span"
            sx={{ m: '0 4px', minWidth: '8ch' }}
            variant="body2"
          >{`${
            lastRowIndex === 0 ? 0 : (firstRowIndex + 1).toLocaleString()
          }-${lastRowIndex.toLocaleString()} ${
            localization.of
          } ${totalRowCount.toLocaleString()}`}</Typography>
          <Box gap="xs">
            {showFirstButton && (
              <Tooltip enterDelay={1000} title={localization.goToFirstPage}>
                <span>
                  <IconButton
                    aria-label={localization.goToFirstPage}
                    disabled={disableBack}
                    onClick={() => setPageIndex(0)}
                    size="small"
                  >
                    <FirstPageIcon {...flipIconStyles(theme)} />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            <Tooltip enterDelay={1000} title={localization.goToPreviousPage}>
              <span>
                <IconButton
                  aria-label={localization.goToPreviousPage}
                  disabled={disableBack}
                  onClick={() => setPageIndex(pageIndex - 1)}
                  size="small"
                >
                  <ChevronLeftIcon {...flipIconStyles(theme)} />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip enterDelay={1000} title={localization.goToNextPage}>
              <span>
                <IconButton
                  aria-label={localization.goToNextPage}
                  disabled={disableNext}
                  onClick={() => setPageIndex(pageIndex + 1)}
                  size="small"
                >
                  <ChevronRightIcon {...flipIconStyles(theme)} />
                </IconButton>
              </span>
            </Tooltip>
            {showLastButton && (
              <Tooltip enterDelay={1000} title={localization.goToLastPage}>
                <span>
                  <IconButton
                    aria-label={localization.goToLastPage}
                    disabled={disableNext}
                    onClick={() => setPageIndex(numberOfPages - 1)}
                    size="small"
                  >
                    <LastPageIcon {...flipIconStyles(theme)} />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Box>
        </>
      ) : null}
    </Box>
  );
};
