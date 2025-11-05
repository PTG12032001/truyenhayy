'use client';

/**
 * Additional Schema Markup Components
 * Add these to specific pages for better SEO
 */

interface OrganizationSchemaProps {
    name: string;
    url: string;
    logo: string;
    description?: string;
    socialLinks?: string[];
}

export function OrganizationSchema({
    name,
    url,
    logo,
    description,
    socialLinks = [],
}: OrganizationSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        logo: {
            '@type': 'ImageObject',
            url: logo,
        },
        description,
        sameAs: socialLinks,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ComicSchemaProps {
    name: string;
    url: string;
    image: string;
    description: string;
    author?: string[];
    genre?: string[];
    datePublished?: string;
    aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
    };
}

export function ComicSchema({
    name,
    url,
    image,
    description,
    author = [],
    genre = [],
    datePublished,
    aggregateRating,
}: ComicSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': url,
        name,
        url,
        image: {
            '@type': 'ImageObject',
            url: image,
        },
        description,
        author: author.map((a) => ({
            '@type': 'Person',
            name: a,
        })),
        genre,
        datePublished,
        inLanguage: 'vi',
        publisher: {
            '@type': 'Organization',
            name: 'Truyenhayy.online',
            url: 'https://truyenhayy.online',
        },
        ...(aggregateRating && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: aggregateRating.ratingValue,
                reviewCount: aggregateRating.reviewCount,
                bestRating: 5,
                worstRating: 1,
            },
        }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ItemListSchemaProps {
    name: string;
    url: string;
    items: Array<{
        name: string;
        url: string;
        image?: string;
    }>;
}

export function ItemListSchema({ name, url, items }: ItemListSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name,
        url,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: item.url,
            ...(item.image && {
                image: {
                    '@type': 'ImageObject',
                    url: item.image,
                },
            }),
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface FAQSchemaProps {
    questions: Array<{
        question: string;
        answer: string;
    }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
