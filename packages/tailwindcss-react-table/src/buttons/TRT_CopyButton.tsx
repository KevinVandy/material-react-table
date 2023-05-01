import React, { MouseEvent, ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { TRT_Cell, TRT_TableInstance } from '../TailwindCSSReactTable.types';

interface Props<TData extends Record<string, any> = {}> {
  cell: TRT_Cell<TData>;
  children: ReactNode;
  table: TRT_TableInstance<TData>;
}

export const TRT_CopyButton = <TData extends Record<string, any> = {}>({
  cell,
  children,
  table,
}: Props<TData>) => {
  const {
    options: { localization, tableBodyCellCopyButtonProps },
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
    tableBodyCellCopyButtonProps instanceof Function
      ? tableBodyCellCopyButtonProps({ cell, column, row, table })
      : tableBodyCellCopyButtonProps;

  const mcTableBodyCellCopyButtonProps =
    columnDef.tableBodyCellCopyButtonProps instanceof Function
      ? columnDef.tableBodyCellCopyButtonProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.tableBodyCellCopyButtonProps;

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
