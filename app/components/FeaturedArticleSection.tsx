interface FeaturedArticleSectionProps {
  title: string;
  article: {
    title: string;
    description: string;
    awards: string[];
    readOnLabel: string;
    links: {
      dio: string;
      linkedin: string;
      medium: string;
    };
  };
  contact: {
    title: string;
    email: string;
    linkedin: string;
  };
  sectionId?: string;
}

export default function FeaturedArticleSection({
  title,
  article,
  contact,
  sectionId = "featured-article-section",
}: FeaturedArticleSectionProps) {
  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
      className="
        mb-12
        rounded-xl
        border border-gray-200 dark:border-gray-700
        bg-gray-50 dark:bg-gray-800
        p-6 sm:p-8
        shadow-md
      "
    >
      {/* Título da seção */}
      <h2
        id={`${sectionId}-title`}
        className="mb-6 text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100"
      >
        🏆 {title}
      </h2>

      {/* Artigo */}
      <article className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {article.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300">
          {article.description}
        </p>

        {/* Premiações */}
        {article.awards.length > 0 && (
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {article.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div>
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-200">
            {article.readOnLabel}
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href={article.links.dio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Ler artigo na DIO"
              >
                DIO
              </a>
            </li>
            <li>
              <a
                href={article.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Ler artigo no LinkedIn"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={article.links.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Ler artigo no Medium"
              >
                Medium
              </a>
            </li>
          </ul>
        </div>
      </article>

      {/* Contato direto */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
          📧 {contact.title}
        </h3>

        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-primary hover:underline"
            >
              {contact.email}
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {contact.linkedin.replace(/^https?:\/\//, "")}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
