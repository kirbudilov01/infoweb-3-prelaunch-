import { Link } from 'react-router-dom';
import '../scss/DocsHome.scss';
import { useLocale } from '../hooks/useLocale';

const DocsHome = () => {
  const { t } = useLocale();

  const sections = [
    {
      title: t.home.sections.gettingStarted.title,
      description: t.home.sections.gettingStarted.description,
      link: '/getting-started'
    },
    {
      title: t.home.sections.integrationAPI.title,
      description: t.home.sections.integrationAPI.description,
      link: '/integration-api'
    },
    {
      title: t.home.sections.testPayments.title,
      description: t.home.sections.testPayments.description,
      link: '/test-payments'
    }
  ];

  return (
    <div className="docs-home">
      <div className="docs-hero">
        <h1>
          <span className="hero-title-brand">FABRICBOT</span>{' '}
          <span className="hero-title-text">ECOSYSTEM</span>
        </h1>
        <p className="docs-hero-description">
          {t.home.hero.description}
        </p>
      </div>

      <div className="docs-sections">
        {sections.map((section) => (
          <Link key={section.link} to={section.link} className="docs-section-card">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DocsHome;

