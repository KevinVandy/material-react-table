import React from 'react';
import { CodeSnippetExample } from '../../mdx/CodeSnippetExample';
import MinimalExample from './MinimalExample';
const MinimalExampleTS = require('!!raw-loader!./MinimalExample.tsx').default;
const MinimalExampleJS = require('!!raw-loader!./MinimalExample.js').default;

const Example = () => {
  return (
    <CodeSnippetExample
      typeScriptCode={MinimalExampleTS}
      javaScriptCode={MinimalExampleJS}
      Component={MinimalExample}
    />
  );
};

export default Example;
