import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import Checklist from './Checklist';
import '../scss/ScrollNavigation.scss';

const ScrollNavigation = () => {
  const { t } = useLocale();
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      // Определяем, находимся ли мы вверху, внизу или посередине
      const isAtTop = scrollTop < 100; // Небольшой отступ для "вверху"
      const isAtBottom = scrollBottom >= documentHeight - 100; // Небольшой отступ для "внизу"
      const isInMiddle = !isAtTop && !isAtBottom;

      setShowUp(!isAtTop);
      setShowDown(!isAtBottom);

      // Если в середине, показываем обе стрелки
      if (isInMiddle) {
        setShowUp(true);
        setShowDown(true);
      }
    };

    // Проверяем при монтировании
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  // Не показываем на главной странице
  if (location.pathname === '/') {
    return null;
  }

  return (
    <>
      <div className="scroll-navigation">
        <button
          className="scroll-button scroll-button--checklist"
          onClick={() => setIsChecklistOpen(!isChecklistOpen)}
          aria-label="Toggle checklist"
          title={t.testPayments.checklist.title}
        >
          <span className="scroll-button__icon">✓</span>
          <span className="scroll-button__text">{t.testPayments.checklist.title}</span>
        </button>
        <div className="scroll-navigation__buttons">
          {showUp && (
            <button
              className="scroll-button scroll-button--up"
              onClick={scrollToTop}
              aria-label="Прокрутить вверх"
              title="Вверх"
            >
              ↑
            </button>
          )}
          {showDown && (
            <button
              className="scroll-button scroll-button--down"
              onClick={scrollToBottom}
              aria-label="Прокрутить вниз"
              title="Вниз"
            >
              ↓
            </button>
          )}
        </div>
      </div>
      {isChecklistOpen && (
        <div className="checklist-popup">
          <div className="checklist-popup__header">
            <h3>{t.testPayments.checklist.title}</h3>
            <button
              className="checklist-popup__close"
              onClick={() => setIsChecklistOpen(false)}
              aria-label="Close checklist"
            >
              ×
            </button>
          </div>
          <div className="checklist-popup__content">
            <Checklist
              items={[
                t.testPayments.checklist.item1,
                t.testPayments.checklist.item2,
                t.testPayments.checklist.item3,
                t.testPayments.checklist.item4,
                t.testPayments.checklist.item5,
                t.testPayments.checklist.item6,
                t.testPayments.checklist.item7,
                t.testPayments.checklist.item8,
                t.testPayments.checklist.item9,
                t.testPayments.checklist.item10,
              ]}
              storageKey="docs-test-payments-checklist"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollNavigation;

