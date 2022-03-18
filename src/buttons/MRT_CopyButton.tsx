import React, { FC, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Cell } from '..';

interface Props {
  cell: MRT_Cell;
}

export const MRT_CopyButton: FC<Props> = ({ cell }) => {
  const { localization } = useMRT();

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
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
        sx={{
          backgroundColor: 'transparent',
          color: 'inherit',
          letterSpacing: 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          m: '-0.25rem',
          textTransform: 'inherit',
          textAlign: 'inherit',
          minWidth: 'unset',
        }}
        variant="text"
      >
        {cell.render('Cell')}
      </Button>
    </Tooltip>
  );
};
