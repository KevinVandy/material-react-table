import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';
const JS = require('!!raw-loader!./sandbox/src/JS.js').default;
const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;
const Legacy = require('!!raw-loader!./sandbox/src/Legacy.tsx').default;
const API = require('!!raw-loader!./../../pages/api/data').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      Component={Example}
      apiCode={API}
      legacyCode={Legacy}
      javaScriptCode={JS}
      typeScriptCode={TS}
      tableId="remote"
    />
  );
};

export default ExampleTable;
