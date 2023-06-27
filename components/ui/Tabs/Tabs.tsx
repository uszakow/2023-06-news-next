import { TabItemInterface } from "@/types/TabItem.interface";
import styles from './Tabs.module.scss';

interface TabsProps {
  tabs: TabItemInterface[];
  activeTab: string;
  className?: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, className = '', onTabChange }) => {
  return (
    <nav className={`${styles.tabs} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? styles.active : ''}
          disabled={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};