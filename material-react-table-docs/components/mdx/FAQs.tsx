import { FC } from 'react';
import Head from 'next/head';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Material React Table free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p><b>Yes</b>, <a href="https://www.material-react-table.com/about#faqs">as stated above</a>, this library uses the <b>MIT</b> License and is free to use.</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Material React Table the same as Material Table?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p><b>No</b>, Material React Table is a totally <b>new and different</b> library from <a href="https://material-table.com/" target="_blank">Material Table</a>, <b>written from scratch</b>, with a different API and different features. However, many of the features of material-table were inspirations for this library. I originally wrote this library with the goal to replace all my uses of material-table in my own enterprise applications.</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use Material React Table?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>It depends. If you are already using <b>MUI</b> for other components in your project, and are looking for a efficient and fully featured data grid component to drop in, this may be the perfect library for you. MRT is not necessarily the lightest weight table library out there, but it has a much <b>smaller bundle size</b> than similar libraries like material-table. If you are looking for the most powerful data grid possible, <a href="https://www.ag-grid.com/" target="_blank"><b>AG Grid</b></a> is still recommended above MRT as long as you do not care about bundle size.</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TypeScript required to use Material React Table?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p><b>No</b>, TypeScript is <b>not required</b> to use Material React Table, but it is a whole lot easier to use Material React Table with TypeScript, <b>especially when defining columns</b>. If you do use TypeScript, try to keep the latest TypeScript version installed, or at least <b>TS version 4.8</b> or higher.</p>',
      },
    },
  ],
};

export const FAQs: FC = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      {structuredData.mainEntity.map((faq, index) => (
        <Accordion elevation={4} defaultExpanded key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h4">{faq.name}</Typography>
          </AccordionSummary>
          <AccordionDetails
            dangerouslySetInnerHTML={{ __html: faq.acceptedAnswer.text }}
            sx={{ lineHeight: '2rem' }}
          />
        </Accordion>
      ))}
    </>
  );
};
