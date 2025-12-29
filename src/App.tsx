import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './scss/App.scss';
import DocsHome from './pages/DocsHome';
import DocsPage from './pages/DocsPage';
import ScrollNavigation from './components/ScrollNavigation';
import { LocaleProvider } from './contexts/LocaleProvider';
import { useLocale } from './hooks/useLocale';
import { ThemeProvider } from './contexts/ThemeProvider';
import { ContentRefProvider } from './contexts/ContentRefProvider';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SidebarToggle from './components/SidebarToggle';

const AppContent = () => {
  const { t } = useLocale();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('docs-sidebar-open');
    // На десктопе по умолчанию открыт, на мобильных - закрыт
    if (window.innerWidth >= 1024) {
      return saved !== 'false';
    }
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('docs-sidebar-open', String(sidebarOpen));
  }, [sidebarOpen]);

  return (
    <Router>
      <div className="docs-app">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
        />
        <SidebarToggle
          onClick={() => setSidebarOpen(!sidebarOpen)}
          isOpen={sidebarOpen}
        />
        <Header />
        <main className="docs-main">
          <Routes>
            <Route path="/" element={<DocsHome />} />
            <Route path="/:page" element={<DocsPage />} />
          </Routes>
        </main>
        <footer className="docs-footer">
          <p>
            {t.common.footer} |{' '}
            <a 
              href="https://fabricbot.tech/api-docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="docs-footer-link"
            >
              {t.common.footerSwagger}
            </a>
          </p>
        </footer>
        <ScrollNavigation />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ContentRefProvider>
          <AppContent />
        </ContentRefProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
