import React from 'react';
import { CodeSnippetExample } from '../../mdx/CodeSnippetExample';
import BasicExample from './BasicExample';
const BasicExampleTS = require('!!raw-loader!./BasicExample.tsx').default;
const BasicExampleJS = require('!!raw-loader!./BasicExample.js').default;

const Example = () => {
  return (
    <CodeSnippetExample
      typeScriptCode={BasicExampleTS}
      javaScriptCode={BasicExampleJS}
      Component={BasicExample}
    />
  );
};

export default Example;
