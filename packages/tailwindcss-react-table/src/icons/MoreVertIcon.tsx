import React from 'react';
import { MoreHorizIcon } from './MoreHorizIcon';

export const MoreVertIcon = (props: JSX.IntrinsicElements['svg']) => (
  <MoreHorizIcon
    data-testid="MoreVertIcon"
    style={{ transform: 'rotate(90deg)' }}
    {...props}
  />
  // <svg
  //   aria-hidden="true"
  //   data-testid="MoreVertIcon"
  //   focusable="false"
  //   viewBox="0 0 24 24"
  //   {...props}
  // >
  //   <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
  // </svg>
);
