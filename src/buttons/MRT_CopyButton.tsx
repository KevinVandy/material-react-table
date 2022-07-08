import React, { FC, ReactNode, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { MRT_Cell, MRT_TableInstance } from '..';

interface Props {
  cell: MRT_Cell;
  children: ReactNode;
  table: MRT_TableInstance;
}

export const MRT_CopyButton: FC<Props> = ({ cell, children, table }) => {
  const {
    options: { localization, muiTableBodyCellCopyButtonProps },
  } = table;
  const { column } = cell;
  const { columnDef } = column;

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: unknown) => {
    navigator.clipboard.writeText(text as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const mTableBodyCellCopyButtonProps =
    muiTableBodyCellCopyButtonProps instanceof Function
      ? muiTableBodyCellCopyButtonProps({ cell, table })
      : muiTableBodyCellCopyButtonProps;

  const mcTableBodyCellCopyButtonProps =
    columnDef.muiTableBodyCellCopyButtonProps instanceof Function
      ? columnDef.muiTableBodyCellCopyButtonProps({
          cell,
          table,
        })
      : columnDef.muiTableBodyCellCopyButtonProps;

  const buttonProps = {
    ...mTableBodyCellCopyButtonProps,
    ...mcTableBodyCellCopyButtonProps,
  };

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      placement="top"
      title={copied ? localization.copiedToClipboard : localization.clickToCopy}
    >
      <Button
        onClick={() => handleCopy(cell.getValue())}
        size="small"
        type="button"
        variant="text"
        {...buttonProps}
        sx={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'copy',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          m: '-0.25rem',
          minWidth: 'unset',
          textAlign: 'inherit',
          textTransform: 'inherit',
          ...buttonProps?.sx,
        }}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
