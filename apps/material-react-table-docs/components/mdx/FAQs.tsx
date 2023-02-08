import Head from 'next/head';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQStructuredData {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

interface Props {
  faqStructuredData: FAQStructuredData;
}

export const FAQs = ({ faqStructuredData }: Props) => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      </Head>
      {faqStructuredData.mainEntity.map((faq, index) => (
        <Accordion elevation={4} key={index}>
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
