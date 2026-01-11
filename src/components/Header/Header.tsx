import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/habits', label: 'Привычки' },
    { path: '/stats', label: 'Статистика' }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logoLink}>
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.img 
              src="/images/logo.png" 
              alt="Habit FoxTracker Logo" 
              className={styles.logoImage}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  const emoji = document.createElement('span');
                  emoji.className = styles.logoEmoji;
                  emoji.textContent = '📊';
                  parent.appendChild(emoji);
                }
              }}
            />
            <motion.div 
              className={styles.logoText}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Habit FoxTracker
            </motion.div>
            <motion.div 
              className={styles.logoSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              След за привычками
            </motion.div>
          </motion.div>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item, index) => (
            <motion.div 
              key={item.path} 
              className={styles.navItem}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link 
                to={item.path} 
                className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div 
                    className={styles.activeBackground}
                    layoutId="activeBackground"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {location.pathname === item.path && (
                  <motion.div 
                    className={styles.foxPaw}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    🐾
                  </motion.div>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;