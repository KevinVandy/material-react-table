import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const FullscreenExitIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="FullscreenExitIcon" {...props}>
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path>
  </SvgIcon>
);
