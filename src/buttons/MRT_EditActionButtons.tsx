import React, { FC } from 'react';
import { IconButton, styled, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { Row } from 'react-table';

const EditActionButtonWrappers = styled('div')({
  display: 'flex',
  gap: '0.75rem',
});

interface Props {
  row: Row;
}

export const MRT_EditActionButtons: FC<Props> = ({ row }) => {
  const { localization, setCurrentEditingRowId, onRowEditSubmit } =
    useMaterialReactTable();

  const handleCancel = () => {
    setCurrentEditingRowId(null);
  };

  const handleSave = async () => {
    setCurrentEditingRowId(null);
    await onRowEditSubmit?.(row);
  };

  return (
    <EditActionButtonWrappers>
      <Tooltip arrow title={localization?.rowActionButtonCancel ?? ''}>
        <IconButton
          aria-label={localization?.rowActionButtonCancel}
          onClick={handleCancel}
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={localization?.rowActionButtonSave ?? ''}>
        <IconButton
          aria-label={localization?.rowActionButtonSave}
          color="info"
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </EditActionButtonWrappers>
  );
};
