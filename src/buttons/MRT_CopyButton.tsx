import React, { FC, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Cell } from '..';

interface Props {
  cell: MRT_Cell;
}

export const MRT_CopyButton: FC<Props> = ({ cell }) => {
  const {
    icons: { CheckBoxIcon, ContentCopyIcon },
    localization,
  } = useMRT();

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip
      arrow
      title={copied ? localization.copiedToClipboard : localization.clickToCopy}
    >
      <IconButton
        aria-label={localization.clickToCopy}
        onClick={() => handleCopy(cell.value)}
        size="small"
        sx={{
          opacity: 0.05,
          m: '0 0.5rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        {copied ? (
          <CheckBoxIcon color="success" fontSize="small" />
        ) : (
          <ContentCopyIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};
