import React from 'react';
import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';
const JS = require('!!raw-loader!./sandbox/src/JS.js').default;
const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;
const API = require('!!raw-loader!./../../pages/api/data').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      Component={Example}
      apiCode={API}
      javaScriptCode={JS}
      typeScriptCode={TS}
      tableId="infinite-scrolling"
    />
  );
};

export default ExampleTable;
