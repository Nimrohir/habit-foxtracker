import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HabitsPage.module.scss';
import HabitForm from '../../components/HabitForm/HabitForm';
import HabitList from '../../components/HabitList/HabitList';
import HabitButton from '../../components/HabitButton/HabitButton';
import { useHabits } from '../../context/HabitsContext';
import { motivationalPhrases } from '../../data/motivationalPhrases';

const HabitsPage: React.FC = () => {
  // Используем контекст вместо useReducer
  const { state, loadHabits, addHabit, updateProgress, deleteHabit, editHabitName } = useHabits();
  const [showForm, setShowForm] = React.useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState<string | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  // Деструктуризация состояния из контекста
  const { habits, loading, error } = state;

  // Анимации (оставляем без изменений)
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200
      }
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  // Функция для получения случайной фразы из нового файла
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[randomIndex];
  };

  // Показать мотивационную фразу (Toast)
  const showMotivationalQuote = () => {
    const quote = getRandomQuote();
    setMotivationalQuote(quote);
    setShowQuote(true);
    
    // Скрыть фразу через 5 секунд (уменьшил с 10)
    setTimeout(() => {
      setShowQuote(false);
    }, 7500);
  };

  // Загрузка привычек с сервера (теперь в контексте, но вызываем при необходимости)
  useEffect(() => {
    // Контекст уже загрузил привычки при монтировании,
    // но вызываем loadHabits для повторной загрузки если нужно
    if (habits.length === 0 && !loading) {
      loadHabits();
    }
  }, []);

  // Обработчик добавления привычки
  const handleAddHabit = async (name: string, description?: string, category?: string) => {
    try {
      await addHabit(name, description, category);
      setShowForm(false);
    } catch (err) {
      console.error('Ошибка при добавлении привычки:', err);
    }
  };

  // Обновление прогресса (отметить день) с мотивационной фразой
  const handleMarkHabit = async (id: number) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const newProgress = Math.min(habit.progress + (100 / 21), 100);
    
    try {
      await updateProgress(id, Math.round(newProgress));
      
      // Показать мотивационную фразу
      showMotivationalQuote();
    } catch (err) {
      console.error('Ошибка при обновлении прогресса:', err);
    }
  };

  // Удаление привычки
  const handleDeleteHabit = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту привычку?')) {
      return;
    }
    
    try {
      await deleteHabit(id);
    } catch (err) {
      console.error('Ошибка при удалении привычки:', err);
    }
  };

  // Редактирование названия привычки
  const handleEditHabit = async (id: number, name: string) => {
    try {
      await editHabitName(id, name);
    } catch (err) {
      console.error('Ошибка при редактировании привычки:', err);
    }
  };

  // Сброс всего прогресса
  const resetAllProgress = async () => {
    if (!window.confirm('Вы уверены, что хотите сбросить прогресс всех привычек?')) {
      return;
    }
    
    try {
      // Используем функции из контекста для сброса каждой привычки
      const resetPromises = habits.map(habit => 
        updateProgress(habit.id, 0)
      );
      
      await Promise.all(resetPromises);
    } catch (err) {
      console.error('Ошибка при сбросе прогресса:', err);
    }
  };

  // Скрытие ошибки (теперь ошибка управляется в контексте)
  const clearError = () => {
    console.log('Очистка ошибки (реализуй в контексте если нужно)');
  };

  return (
    <motion.div 
      className={styles.habitsPage}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className={styles.title}>Ваши привычки</h1>
      <p className={styles.description}>
        Отслеживайте прогресс и формируйте полезные ритуалы каждый день!
      </p>

      {/* Toast-уведомление с мотивационной фразой */}
      <AnimatePresence>
        {showQuote && motivationalQuote && (
          <motion.div
            className={`${styles.motivationalToast} ${!showQuote ? styles.exiting : ''}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className={styles.toastIcon}>💪</div>
            <div className={styles.toastContent}>
              <p className={styles.toastText}>{motivationalQuote.split(' — ')[0]}</p>
              <div className={styles.toastAuthor}>
                — {motivationalQuote.split(' — ')[1]}
              </div>
            </div>
            <button 
              className={styles.toastClose}
              onClick={() => setShowQuote(false)}
              aria-label="Закрыть уведомление"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Сообщение об ошибке из контекста */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className={styles.errorMessage}
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            ⚠️ {error}
            <motion.button 
              onClick={clearError} 
              className={styles.closeError}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Список привычек с состояниями загрузки/ошибки */}
      <div className={styles.habitsContainer}>
        {loading ? (
          <motion.div 
            className={styles.loadingState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className={styles.spinner}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <p>Загружаем ваши привычки...</p>
          </motion.div>
        ) : error && habits.length === 0 ? (
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className={styles.errorText}>⚠️ {error}</p>
            <HabitButton 
              text="Повторить попытку" 
              onClick={loadHabits}
              variant="primary"
            />
          </motion.div>
        ) : (
          <HabitList 
            habits={habits} 
            onMark={handleMarkHabit}
            onDelete={handleDeleteHabit}
            onEdit={handleEditHabit}
            loading={loading}
            showAddButton={true}
            onAddClick={() => setShowForm(true)}
          />
        )}
      </div>

      {/* Форма добавления привычки с анимацией */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className={styles.modalContent}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <HabitForm 
                onAdd={handleAddHabit} 
                onCancel={() => setShowForm(false)}
                categories={['Здоровье', 'Развитие', 'Работа', 'Спорт', 'Другое']}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопки действий */}
      <motion.div 
        className={styles.actions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink to="/stats" className={styles.statsButton}>
            📊 Смотреть подробную статистику
          </NavLink>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HabitButton 
            text="Сбросить прогресс всех привычек" 
            onClick={resetAllProgress}
            variant="secondary"
            className={styles.resetButton}
            disabled={habits.length === 0}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HabitsPage;