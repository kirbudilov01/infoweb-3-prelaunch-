import { Link } from 'react-router-dom';
import '../scss/DocsHome.scss';
import { useLocale } from '../hooks/useLocale';

const DocsHome = () => {
  const { t } = useLocale();

  const sections = [
    {
      title: t.home.sections.product.title,
      description: t.home.sections.product.description,
      link: '/product'
    },
    {
      title: t.home.sections.roadmap.title,
      description: t.home.sections.roadmap.description,
      link: '/roadmap'
    },
    {
      title: t.home.sections.team.title,
      description: t.home.sections.team.description,
      link: '/team'
    },
    {
      title: t.home.sections.token.title,
      description: t.home.sections.token.description,
      link: '/token'
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

