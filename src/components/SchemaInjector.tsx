import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SchemaInjectorProps {
  calculatorName: string;
  calculatorDescription: string;
  faq: { question: string; answer: string }[];
  articleBody: string;
  breadcrumbs: { name: string; path: string }[];
}

const SITE_URL = 'https://YOUR_DOMAIN.COM'; // Replace with your actual domain

const SchemaInjector: React.FC<SchemaInjectorProps> = ({ calculatorName, calculatorDescription, faq, articleBody, breadcrumbs }) => {
  const location = useLocation();
  const pageUrl = `${SITE_URL}${location.pathname}`;

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "url": pageUrl,
          "name": `${calculatorName} | Calcorda`,
          "description": calculatorDescription,
          "isPartOf": {
            "@type": "WebSite",
            "url": SITE_URL,
            "name": "Calcorda"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${SITE_URL}${item.path}`
          }))
        },
        {
          "@type": "HowTo",
          "name": `How to use the ${calculatorName}`,
          "description": calculatorDescription,
          "step": [
            {
              "@type": "HowToStep",
              "name": "Enter Data",
              "text": "Enter your data into the input fields provided on the calculator."
            },
            {
              "@type": "HowToStep",
              "name": "Calculate",
              "text": "Click the 'Calculate' button to process the information."
            },
            {
              "@type": "HowToStep",
              "name": "View Results",
              "text": "View the results, which are displayed instantly on the screen."
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        },
        {
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
          },
          "headline": `Complete Guide to the ${calculatorName}`,
          "author": {
            "@type": "Organization",
            "name": "Calcorda"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Calcorda"
          },
          "datePublished": new Date().toISOString().split('T')[0],
          "dateModified": new Date().toISOString().split('T')[0],
          "articleBody": articleBody
        }
      ]
    };

    const scriptId = 'app-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.innerHTML = JSON.stringify(schema);

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        // In a SPA, it's better to just clear the content than remove/re-add the element
        script.innerHTML = '';
      }
    };
  }, [calculatorName, calculatorDescription, faq, articleBody, pageUrl, breadcrumbs]);

  return null;
};

export default SchemaInjector;
