import React from 'react';
import { SvgIconProps } from './SvgIcon';
import { SvgIcon } from './SvgIcon';

export const ViewColumnIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="ViewColumnIcon" {...props}>
    <path d="M14.67 5v14H9.33V5h5.34zm1 14H21V5h-5.33v14zm-7.34 0V5H3v14h5.33z"></path>
  </SvgIcon>
);
