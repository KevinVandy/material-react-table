import React from 'react';
import { SourceCodeSnippet } from '../../mdx/SourceCodeSnippet';
import BasicExample from './BasicExample';
const BasicExampleTS = require('!!raw-loader!./BasicExample.tsx').default;
const BasicExampleJS = require('!!raw-loader!./BasicExample.js').default;

const Example = () => {
  return (
    <SourceCodeSnippet
      typeScriptCode={BasicExampleTS}
      javaScriptCode={BasicExampleJS}
      Component={BasicExample}
    />
  );
};

export default Example;
