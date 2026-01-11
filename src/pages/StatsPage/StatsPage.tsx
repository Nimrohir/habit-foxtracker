import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './StatsPage.module.scss';
import { calculateAllStats } from '../../utils/statsCalculations';
import type { Stats } from '../../utils/statsCalculations';
import { useHabits } from '../../context/HabitsContext';

const StatsPage: React.FC = () => {
  const { state } = useHabits();
  const { habits } = state;

  const stats: Stats = useMemo(() => calculateAllStats(habits), [habits]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className={styles.statsPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Статистика привычек
      </motion.h1>
      
      <motion.p 
        className={styles.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Анализируйте свой прогресс и достигайте большего!
      </motion.p>

      {habits.length > 0 ? (
        <>
          <motion.div 
            className={styles.statsContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className={`${styles.statCard} ${styles.progressCard}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.statIcon}>📊</div>
              <h3>Общий прогресс</h3>
              <div className={styles.progressCircle}>
                <div 
                  className={styles.progressFill}
                  style={{ 
                    background: `conic-gradient(#10B981 ${stats.totalProgress * 3.6}deg, #E2E8F0 0deg)`
                  }}
                />
                <span className={styles.progressText}>{stats.totalProgress}%</span>
              </div>
              <p>Средний прогресс по всем привычкам</p>
            </motion.div>

            <motion.div 
              className={`${styles.statCard} ${styles.completedCard}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.statIcon}>✅</div>
              <h3>Выполнено сегодня</h3>
              <div className={styles.bigNumber}>{stats.completedToday}</div>
              <p>из {stats.totalHabits} привычек</p>
            </motion.div>

            <motion.div 
              className={`${styles.statCard} ${styles.bestCard}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.statIcon}>🏆</div>
              <h3>Лучшая привычка</h3>
              {stats.bestHabit ? (
                <>
                  <div className={styles.bestHabitName}>{stats.bestHabit.name}</div>
                  <div className={styles.bestProgress}>{stats.bestHabit.progress}%</div>
                </>
              ) : (
                <p>Нет данных</p>
              )}
            </motion.div>

            <motion.div 
              className={`${styles.statCard} ${styles.streakCard}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.statIcon}>🔥</div>
              <h3>Серия успехов</h3>
              <div className={styles.bigNumber}>{stats.streak}</div>
              <p>дней продуктивности</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.ctaSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2>Продолжайте в том же духе!</h2>
            <p>Ваш прогресс впечатляет. Не останавливайтесь на достигнутом!</p>
            <Link to="/habits" className={styles.ctaButton}>
              Вернуться к привычкам
            </Link>
          </motion.div>
        </>
      ) : (
        <motion.div 
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styles.emptyIcon}>📈</div>
          <h3>Нет данных для статистики</h3>
          <p>Добавьте привычки, чтобы отслеживать свой прогресс</p>
          <Link to="/habits" className={styles.emptyButton}>
            Добавить первую привычку
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StatsPage;