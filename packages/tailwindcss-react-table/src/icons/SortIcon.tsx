import React from 'react';

export const SortIcon = (props: JSX.IntrinsicElements['svg']) => (
  <svg
    aria-hidden="true"
    data-testid="SortIcon"
    focusable="false"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path>
  </svg>
);
