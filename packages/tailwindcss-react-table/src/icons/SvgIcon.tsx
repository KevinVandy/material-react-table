import React from 'react';

export type SvgIconProps = JSX.IntrinsicElements['svg'];

export const SvgIcon = (props: SvgIconProps) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    focusable="false"
    fontSize="1.5rem"
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  />
);
