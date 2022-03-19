import React from 'react';
import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './TS';
const JS = require('!!raw-loader!./JS.js').default;
const TS = require('!!raw-loader!./TS.tsx').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      Component={Example}
      javaScriptCode={JS}
      typeScriptCode={TS}
      idPrefix="customize-selection-"
    />
  );
};

export default ExampleTable;
