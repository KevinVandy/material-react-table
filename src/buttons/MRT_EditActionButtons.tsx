import React, { FC } from 'react';
import { IconButton, styled, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMRT } from '../useMRT';
import { Row } from 'react-table';

const EditActionButtonWrappers = styled('div')({
  display: 'flex',
  gap: '0.75rem',
});

interface Props {
  row: Row;
}

export const MRT_EditActionButtons: FC<Props> = ({ row }) => {
  const {
    localization,
    setCurrentEditingRow,
    onRowEditSubmit,
    currentEditingRow,
  } = useMRT();

  const handleCancel = () => {
    row.values = row.original;
    setCurrentEditingRow(null);
  };

  const handleSave = async () => {
    await onRowEditSubmit?.(currentEditingRow ?? row);
    setCurrentEditingRow(null);
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
