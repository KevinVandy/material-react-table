import '../styles/globals.css';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import PlausibleProvider from 'next-plausible';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import { ThemeContextProvider } from '../styles/ThemeContext';
import { mdxComponents } from '../components/mdx/mdxComponents';
import { Layout } from '../components/navigation/Layout';

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>Material React Table V3</title>
        <meta
          name="description"
          content="Material React Table, a fully featured Material UI V9 implementation of TanStack React Table V8. Written from the ground up in TypeScript."
        />
        <link
          rel="canonical"
          href={`https://www.material-react-table.com${pathname}`}
        />
        <link rel="icon" href="/mrt_logo.png" />
        <meta property="og:image" content="/mrt_logo.png" />
        <meta
          property="og:url"
          content={`https://www.material-react-table.com${pathname}`}
        />
        {process.env.NODE_ENV === 'production' && (
          <>
            <link
              rel="preconnect"
              href="https://1W9SWN5ZAH-dsn.algolia.net"
              crossOrigin="anonymous"
            />
            <script
              async
              src="https://media.ethicalads.io/media/client/ethicalads.min.js"
            />
          </>
        )}
      </Head>
      <PlausibleProvider
        domain="material-react-table.com"
        enabled={process.env.NODE_ENV === 'production'}
      >
        <ThemeContextProvider>
          <MDXProvider components={mdxComponents}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MDXProvider>
        </ThemeContextProvider>
      </PlausibleProvider>
    </>
  );
}

export default App;
