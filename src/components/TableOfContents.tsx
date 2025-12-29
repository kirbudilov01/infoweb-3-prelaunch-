import { useEffect, useState } from 'react';
import '../scss/TableOfContents.scss';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement | null>;
}

const TableOfContents = ({ contentRef }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    // Используем MutationObserver для отслеживания изменений в DOM
    const updateHeadings = () => {
      const headingElements = contentRef.current?.querySelectorAll('h2, h3') || [];
      const extractedHeadings: Heading[] = [];

      headingElements.forEach((heading) => {
        const text = heading.textContent || '';
        const level = parseInt(heading.tagName.charAt(1));
        
        // Создаем ID из текста заголовка
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();

        // Устанавливаем ID элементу, если его еще нет
        if (!heading.id) {
          heading.id = id;
        }

        extractedHeadings.push({
          id: heading.id || id,
          text,
          level,
        });
      });

      setHeadings(extractedHeadings);
    };

    // Обновляем заголовки сразу
    updateHeadings();

    // Создаем observer для отслеживания изменений
    const observer = new MutationObserver(updateHeadings);
    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [contentRef]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Ищем элемент сначала в contentRef, потом в document
    let element: HTMLElement | null = null;
    if (contentRef.current) {
      element = contentRef.current.querySelector(`#${id}`) as HTMLElement | null;
    }
    if (!element) {
      element = document.getElementById(id);
    }
    
    if (element) {
      const headerOffset = 100; // Отступ от верха для sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="table-of-contents">
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item toc-level-${heading.level}`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;

