import { type MouseEvent, type ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_Cell, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  cell: MRT_Cell<TData>;
  children: ReactNode;
  table: MRT_TableInstance<TData>;
}

export const MRT_CopyButton = <TData extends Record<string, any>>({
  cell,
  children,
  table,
}: Props<TData>) => {
  const {
    options: { localization, muiCopyButtonProps },
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;

  const [copied, setCopied] = useState(false);

  const handleCopy = (event: MouseEvent, text: unknown) => {
    event.stopPropagation();
    navigator.clipboard.writeText(text as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const mTableBodyCellCopyButtonProps =
    muiCopyButtonProps instanceof Function
      ? muiCopyButtonProps({ cell, column, row, table })
      : muiCopyButtonProps;

  const mcTableBodyCellCopyButtonProps =
    columnDef.muiCopyButtonProps instanceof Function
      ? columnDef.muiCopyButtonProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.muiCopyButtonProps;

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
      title={
        buttonProps?.title ??
        (copied ? localization.copiedToClipboard : localization.clickToCopy)
      }
    >
      <Button
        onClick={(e) => handleCopy(e, cell.getValue())}
        size="small"
        type="button"
        variant="text"
        {...buttonProps}
        sx={(theme) => ({
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
          ...(buttonProps?.sx instanceof Function
            ? buttonProps.sx(theme)
            : (buttonProps?.sx as any)),
        })}
        title={undefined}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
