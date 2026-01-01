import { Link } from 'react-router-dom';
import '../scss/DocsHome.scss';
import { useLocale } from '../hooks/useLocale';

const DocsHome = () => {
  const { t } = useLocale();

  const sections = [
    {
      number: '1',
      title: t.home.sections.product.title,
      description: t.home.sections.product.description,
      link: '/product'
    },
    {
      number: '2',
      title: t.home.sections.roadmap.title,
      description: t.home.sections.roadmap.description,
      link: '/roadmap'
    },
    {
      number: '3',
      title: t.home.sections.team.title,
      description: t.home.sections.team.description,
      link: '/team'
    },
    {
      number: '4',
      title: t.home.sections.token.title,
      description: t.home.sections.token.description,
      link: '/token'
    },
    {
      number: '5',
      title: t.home.sections.partners.title,
      description: t.home.sections.partners.description,
      link: '/partners'
    },
    {
      number: '6',
      title: t.home.sections.future.title,
      description: t.home.sections.future.description,
      link: '/future'
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
            <div className="card-number">{section.number}</div>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DocsHome;

