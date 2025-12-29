import { useState, useEffect } from 'react';
import '../scss/Checklist.scss';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistProps {
  items: string[];
  storageKey: string;
}

const Checklist = ({ items, storageKey }: ChecklistProps) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return items.map((label, index) => ({
          id: `item-${index}`,
          label,
          checked: parsed[`item-${index}`] || false,
        }));
      } catch {
        // If parsing fails, initialize with all unchecked
      }
    }
    return items.map((label, index) => ({
      id: `item-${index}`,
      label,
      checked: false,
    }));
  });

  useEffect(() => {
    const state: Record<string, boolean> = {};
    checklistItems.forEach((item) => {
      state[item.id] = item.checked;
    });
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [checklistItems, storageKey]);

  const toggleItem = (id: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <ul className="checklist">
      {checklistItems.map((item) => (
        <li key={item.id} className="checklist-item">
          <label className="checklist-label">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              className="checklist-checkbox"
            />
            <span className="checklist-text">{item.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Checklist;

