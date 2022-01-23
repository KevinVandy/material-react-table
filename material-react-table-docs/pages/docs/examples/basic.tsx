import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { BasicExample } from '../../../components/examples/BasicExample';

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Material React Table - Basic Example</title>
      </Head>
      <Typography variant="h1">
        <BasicExample />
      </Typography>
    </div>
  );
};

export default Page;
