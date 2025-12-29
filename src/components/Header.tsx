import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useTheme } from '../hooks/useTheme';
import '../scss/Header.scss';

const Header = () => {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="docs-header">
      <div className="docs-header-content">
        <h1>
          <Link to="/">
            <span className="header-title-brand">FABRICBOT</span>{' '}
            <span className="header-title-text">ECOSYSTEM</span>
          </Link>
        </h1>
        <div className="docs-header-controls">
          <div className="locale-switcher">
            <button
              className={`locale-button ${locale === 'ru' ? 'active' : ''}`}
              onClick={() => setLocale('ru')}
              title="Русский"
            >
              RU
            </button>
            <button
              className={`locale-button ${locale === 'en' ? 'active' : ''}`}
              onClick={() => setLocale('en')}
              title="English"
            >
              EN
            </button>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Переключить на темную тему' : 'Switch to light theme'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

