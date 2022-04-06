import React, { FC, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Cell } from '..';

interface Props {
  cell: MRT_Cell;
}

export const MRT_CopyButton: FC<Props> = ({ cell, children }) => {
  const { localization, muiTableBodyCellCopyButtonProps } = useMRT();

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: unknown) => {
    navigator.clipboard.writeText(text as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const mTableBodyCellCopyButtonProps =
    muiTableBodyCellCopyButtonProps instanceof Function
      ? muiTableBodyCellCopyButtonProps(cell)
      : muiTableBodyCellCopyButtonProps;

  const mcTableBodyCellCopyButtonProps =
    cell.column.muiTableBodyCellCopyButtonProps instanceof Function
      ? cell.column.muiTableBodyCellCopyButtonProps(cell)
      : cell.column.muiTableBodyCellCopyButtonProps;

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
        aria-label={localization.clickToCopy}
        onClick={() => handleCopy(cell.value)}
        size="small"
        {...buttonProps}
        sx={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          m: '-0.25rem',
          minWidth: 'unset',
          textAlign: 'inherit',
          textTransform: 'inherit',
          ...buttonProps?.sx,
        }}
        variant="text"
      >
        {children}
      </Button>
    </Tooltip>
  );
};
