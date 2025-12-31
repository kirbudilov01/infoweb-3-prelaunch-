import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useContentRef } from '../hooks/useContentRef';
import TableOfContents from './TableOfContents';
import '../scss/Sidebar.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { t } = useLocale();
  const location = useLocation();
  const { contentRef } = useContentRef();

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isDocumentationPage = location.pathname !== '/';

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>{t.common.title}</h2>
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/"
            className={`sidebar-nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={onClose}
          >
            {t.home.hero.title}
          </Link>
          <Link
            to="/product"
            className={`sidebar-nav-item ${location.pathname === '/product' ? 'active' : ''}`}
            onClick={onClose}
          >
            {t.home.sections.product.title}
          </Link>
          <Link
            to="/roadmap"
            className={`sidebar-nav-item ${location.pathname === '/roadmap' ? 'active' : ''}`}
            onClick={onClose}
          >
            {t.home.sections.roadmap.title}
          </Link>
          <Link
            to="/team"
            className={`sidebar-nav-item ${location.pathname === '/team' ? 'active' : ''}`}
            onClick={onClose}
          >
            {t.home.sections.team.title}
          </Link>
          <Link
            to="/token"
            className={`sidebar-nav-item ${location.pathname === '/token' ? 'active' : ''}`}
            onClick={onClose}
          >
            {t.home.sections.token.title}
          </Link>
        </nav>
        {isDocumentationPage && contentRef && (
          <div className="sidebar-toc">
            <TableOfContents contentRef={contentRef} />
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;

