import React from 'react';
import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';
const JS = require('!!raw-loader!./sandbox/src/JS.js').default;
const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;
const Props = require('!!raw-loader!./sandbox/src/Props.tsx').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      Component={Example}
      javaScriptCode={JS}
      propsCode={Props}
      typeScriptCode={TS}
      tableId="advanced"
    />
  );
};

export default ExampleTable;
