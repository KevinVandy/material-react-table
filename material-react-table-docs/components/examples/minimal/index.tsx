import React from 'react';
import { SourceCodeSnippet } from '../../mdx/SourceCodeSnippet';
import MinimalExample from './MinimalExample';
const MinimalExampleTS = require('!!raw-loader!./MinimalExample.tsx').default;
const MinimalExampleJS = require('!!raw-loader!./MinimalExample.js').default;

const Example = () => {
  return (
    <SourceCodeSnippet
      typeScriptCode={MinimalExampleTS}
      javaScriptCode={MinimalExampleJS}
      Component={MinimalExample}
    />
  );
};

export default Example;
