import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
  variant?: 'icon' | 'text';
}

export const MRT_EditActionButtons = <TData extends Record<string, any>>({
  row,
  table,
  variant = 'icon',
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { CancelIcon, SaveIcon },
      localization,
      onCreatingRowCancel,
      onCreatingRowSave,
      onEditingRowSave,
      onEditingRowCancel,
    },
    refs: { editInputRefs },
    setCreatingRow,
    setEditingRow,
  } = table;
  const { creatingRow, editingRow, isSaving } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const handleCancel = () => {
    if (isCreating) {
      onCreatingRowCancel?.({ row, table });
      setCreatingRow(null);
    } else if (isEditing) {
      onEditingRowCancel?.({ row, table });
      setEditingRow(null);
    }
  };

  const handleSubmitRow = () => {
    //look for auto-filled input values
    Object.values(editInputRefs?.current)
      .filter((inputRef) => row.id === inputRef?.name?.split('_')?.[0])
      ?.forEach((input) => {
        if (
          input.value !== undefined &&
          Object.hasOwn(row?._valuesCache as object, input.name)
        ) {
          // @ts-ignore
          row._valuesCache[input.name] = input.value;
        }
      });
    if (isCreating)
      onCreatingRowSave?.({
        exitCreatingMode: () => setCreatingRow(null),
        row,
        table,
        values: row._valuesCache,
      });
    else if (isEditing) {
      onEditingRowSave?.({
        exitEditingMode: () => setEditingRow(null),
        row,
        table,
        values: row?._valuesCache,
      });
    }
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{ display: 'flex', gap: '0.75rem' }}
    >
      {variant === 'icon' ? (
        <>
          <Tooltip arrow title={localization.cancel}>
            <IconButton aria-label={localization.cancel} onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title={localization.save}>
            <IconButton
              aria-label={localization.save}
              color="info"
              onClick={handleSubmitRow}
            >
              {isSaving ? <CircularProgress size={18} /> : <SaveIcon />}
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Button sx={{ minWidth: '100px' }} onClick={handleCancel}>
            {localization.cancel}
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            onClick={handleSubmitRow}
            variant="contained"
          >
            {isSaving && <CircularProgress color="inherit" size={18} />}
            {localization.save}
          </Button>
        </>
      )}
    </Box>
  );
};
