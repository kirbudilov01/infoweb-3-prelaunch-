import '../scss/SidebarToggle.scss';

interface SidebarToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

const SidebarToggle = ({ onClick, isOpen }: SidebarToggleProps) => {
  return (
    <button
      className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      title={isOpen ? 'Close checklist' : 'Open checklist'}
    >
      <span className="sidebar-toggle-icon">
        {isOpen ? '←' : '☰'}
      </span>
    </button>
  );
};

export default SidebarToggle;

