"use client";

import type { Translations } from "@/lib/i18n";

interface FeaturedArticleSectionProps {
  dict: Translations["sections"] & { featuredArticle: string };
  article: Translations["featuredArticle"];
}

export default function FeaturedArticleSection({ dict, article }: FeaturedArticleSectionProps) {
  return (
    <section
      className="mb-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow"
      aria-labelledby="featured-article"
    >
      <h2
        id="featured-article"
        className="text-2xl font-semibold text-blue-600 mb-4"
      >
        🏆 {dict.featuredArticle}
      </h2>

      <h3 className="text-xl font-bold mb-2">{article.title}</h3>
      <p className="mb-2">{article.description}</p>

      <ul className="list-disc list-inside mb-4">
        <li>{article.award1}</li>
        <li>{article.award2}</li>
      </ul>

      <p className="mb-2">{article.readOn}</p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <a
            href={article.links.dio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            DIO
          </a>
        </li>
        <li>
          <a
            href={article.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={article.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Medium
          </a>
        </li>
      </ul>

      {/* Direct Contacts */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">📧 {dict.contactTitle}</h3>
        <ul className="space-y-2">
          <li>
            Email:{" "}
            <a
              href="mailto:santossergiorealbjj@outlook.com"
              className="text-blue-600 hover:underline"
            >
              santossergiorealbjj@outlook.com
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/santossergioluiz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              linkedin.com/in/santossergioluiz
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
