import React from 'react';
import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
const JS = require('!!raw-loader!./JS.js').default;
const TS = require('!!raw-loader!./TS.tsx').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      javaScriptCode={JS}
      typeScriptCode={TS}
      tableId="ssr"
    />
  );
};

export default ExampleTable;
