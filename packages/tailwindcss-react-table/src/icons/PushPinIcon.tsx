import React from 'react';

export const PushPinIcon = (props: JSX.IntrinsicElements['svg']) => (
  <svg
    aria-hidden="true"
    data-testid="PushPinIcon"
    focusable="false"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill-rule="evenodd"
      d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"
    ></path>
  </svg>
);
