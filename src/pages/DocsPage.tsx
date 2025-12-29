import { useParams, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import '../scss/DocsPage.scss';
import GettingStarted from './docs/GettingStarted';
import IntegrationAPI from './docs/IntegrationAPI';
import TestPayments from './docs/TestPayments';
import { useLocale } from '../hooks/useLocale';
import { useContentRef } from '../hooks/useContentRef';

const DocsPage = () => {
  const { page } = useParams<{ page: string }>();
  const { t } = useLocale();
  const localContentRef = useRef<HTMLDivElement>(null);
  const { contentRef } = useContentRef();

  // Синхронизируем локальный ref с глобальным
  useEffect(() => {
    const localRef = localContentRef.current;
    const globalRef = contentRef as React.MutableRefObject<HTMLDivElement | null>;
    
    if (localRef) {
      globalRef.current = localRef;
    }
    
    return () => {
      if (globalRef.current === localRef) {
        globalRef.current = null;
      }
    };
  }, [contentRef, page]);

  const pageComponents: Record<string, React.ComponentType> = {
    'getting-started': GettingStarted,
    'integration-api': IntegrationAPI,
    'test-payments': TestPayments,
  };

  const PageComponent = page ? pageComponents[page] : null;

  if (!PageComponent) {
    return (
      <div className="docs-page">
        <div className="docs-nav">
          <Link to="/" className="docs-nav-back">{t.common.backToHome}</Link>
        </div>
        <div className="docs-content" ref={localContentRef}>
          <h1>{t.common.pageNotFound}</h1>
          <p>{t.common.pageNotFoundDesc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="docs-page">
      <div className="docs-nav">
        <Link to="/" className="docs-nav-back">{t.common.backToHome}</Link>
      </div>
      <div className="docs-content" ref={localContentRef}>
        <PageComponent />
      </div>
    </div>
  );
};

export default DocsPage;

