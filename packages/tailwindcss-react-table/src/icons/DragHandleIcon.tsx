import React from 'react';

export const DragHandleIcon = (props: JSX.IntrinsicElements['svg']) => (
  <svg
    aria-hidden="true"
    data-testid="DragHandleIcon"
    focusable="false"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path>
  </svg>
);
