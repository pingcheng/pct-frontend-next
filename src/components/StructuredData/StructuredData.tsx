import React from 'react';

interface PersonStructuredDataProps {
  name: string;
  jobTitle: string;
  url: string;
  image: string;
  sameAs: string[];
  worksFor?: {
    name: string;
    url: string;
  };
}

export function PersonStructuredData({
  name,
  jobTitle,
  url,
  image,
  sameAs,
  worksFor,
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    url,
    image,
    sameAs,
    ...(worksFor && {
      worksFor: {
        "@type": "Organization",
        name: worksFor.name,
        url: worksFor.url,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebsiteStructuredDataProps {
  name: string;
  url: string;
  description: string;
  author: {
    name: string;
    url: string;
  };
}

export function WebsiteStructuredData({
  name,
  url,
  description,
  author,
}: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}