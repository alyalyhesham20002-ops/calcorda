import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const SITE_URL = 'https://YOUR_DOMAIN.COM'; // Replace with your actual domain

const Meta: React.FC<MetaProps> = ({ title, description, canonicalUrl, ogImage }) => {
  const fullTitle = `${title} | Calcorda`;
  const url = `${SITE_URL}${canonicalUrl || ''}`;
  const image = ogImage || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={url} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Calcorda" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Meta;
