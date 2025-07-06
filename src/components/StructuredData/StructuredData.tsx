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
  knowsAbout?: string[];
  address?: {
    addressLocality: string;
    addressRegion?: string;
    addressCountry: string;
  };
  email?: string;
  telephone?: string;
}

export function PersonStructuredData({
  name,
  jobTitle,
  url,
  image,
  sameAs,
  worksFor,
  knowsAbout,
  address,
  email,
  telephone,
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
    ...(knowsAbout && { knowsAbout }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        addressLocality: address.addressLocality,
        ...(address.addressRegion && { addressRegion: address.addressRegion }),
        addressCountry: address.addressCountry,
      },
    }),
    ...(email && { email }),
    ...(telephone && { telephone }),
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

interface BreadcrumbListProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbListStructuredData({ items }: BreadcrumbListProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ProfessionalServiceProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed?: string;
  serviceType?: string;
}

export function ProfessionalServiceStructuredData({
  name,
  description,
  provider,
  areaServed,
  serviceType,
}: ProfessionalServiceProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    provider: {
      "@type": "Person",
      name: provider.name,
      url: provider.url,
    },
    ...(areaServed && { areaServed }),
    ...(serviceType && { serviceType }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}