import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HabitList.module.scss';
import HabitButton from '../HabitButton/HabitButton';

// Тип для привычки (можно импортировать из редьюсера)
interface Habit {
  id: number;
  name: string;
  description?: string;
  progress: number;
  category?: string;
}

interface HabitListProps {
  habits: Habit[];
  onMark: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit: (id: number, name: string) => void; // ★★★ НОВЫЙ ПРОПС ★★★
  loading?: boolean;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

// Варианты анимаций
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: {
      duration: 0.2
    }
  }
};

const HabitList: React.FC<HabitListProps> = ({ 
  habits, 
  onMark, 
  onDelete,
  onEdit, // ★★★ ПОЛУЧАЕМ ФУНКЦИЮ РЕДАКТИРОВАНИЯ ★★★
  loading = false,
  showAddButton = false,
  onAddClick 
}) => {
  // ★★★ СОСТОЯНИЯ ДЛЯ УПРАВЛЕНИЯ РЕДАКТИРОВАНИЕМ ★★★
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  // Функция начала редактирования
  const handleEditStart = (habit: Habit) => {
    setEditingId(habit.id);
    setEditValue(habit.name);
  };

  // Функция сохранения изменений
  const handleEditSave = (id: number) => {
    if (editValue.trim()) {
      onEdit(id, editValue.trim()); // Вызываем переданную функцию
    }
    setEditingId(null);
    setEditValue('');
  };

  // Функция отмены редактирования
  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  // Обработка клавиш (Enter - сохранить, Escape - отмена)
  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      handleEditSave(id);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Загрузка привычек...</p>
      </div>
    );
  }

  if (habits.length === 0 && !showAddButton) {
    return (
      <div className={styles.empty}>
        <p>У вас пока нет привычек.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.habitContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {habits.map((habit) => {
        const daysCompleted = Math.round(habit.progress / 100 * 21);
        const isCompleted = habit.progress >= 100;
        const daysText = daysCompleted === 1 ? 'день' : 
                        daysCompleted >= 2 && daysCompleted <= 4 ? 'дня' : 'дней';
        
        return (
          <motion.div 
            key={habit.id}
            className={styles.habitCard}
            variants={itemVariants}
            // ★★★ ИЗМЕНЕНА АНИМАЦИЯ ПРИ РЕДАКТИРОВАНИИ ★★★
            whileHover={{ scale: editingId === habit.id ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            exit="exit"
            layout
          >
            {/* Кнопка удаления */}
            {onDelete && (
              <button 
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(habit.id);
                }}
                title="Удалить привычку"
                aria-label="Удалить привычку"
              >
                ×
              </button>
            )}
            
            {/* ★★★ УСЛОВНЫЙ РЕНДЕРИНГ: РЕЖИМ РЕДАКТИРОВАНИЯ ИЛИ ПРОСМОТРА ★★★ */}
            {editingId === habit.id ? (
              <div className={styles.editContainer}>
                <motion.input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleEditSave(habit.id)}
                  onKeyDown={(e) => handleKeyDown(e, habit.id)}
                  className={styles.editInput}
                  autoFocus
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                />
                <div className={styles.editButtons}>
                  <button 
                    className={styles.saveButton}
                    onClick={() => handleEditSave(habit.id)}
                  >
                    ✓
                  </button>
                  <button 
                    className={styles.cancelButton}
                    onClick={handleEditCancel}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <motion.div 
                className={styles.habitHeader}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span 
                  className={styles.habitName}
                  onClick={() => handleEditStart(habit)}
                  title="Кликните, чтобы редактировать"
                >
                  {habit.name}
                  <span className={styles.editHint}> ✎</span>
                </span>
                {habit.category && (
                  <span className={styles.habitCategory}>{habit.category}</span>
                )}
              </motion.div>
            )}
            
            {/* Остальное содержимое карточки (без изменений) */}
            {habit.description && (
              <p className={styles.habitDescription}>{habit.description}</p>
            )}
            
            <div className={styles.progressSection}>
              <div className={styles.progressInfo}>
                <div className={styles.progressBarContainer}>
                  <motion.div 
                    className={styles.progressBar} 
                    initial={{ width: 0 }}
                    animate={{ width: `${habit.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    role="progressbar"
                    aria-valuenow={habit.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                
                <div className={styles.daysCounter}>
                  <span className={styles.daysCompleted}>{daysCompleted}</span>
                  <span className={styles.daysSeparator}>/</span>
                  <span className={styles.daysTotal}>21 {daysText}</span>
                  
                  {isCompleted && (
                    <span className={styles.completedBadge}>
                      <span className={styles.checkIcon}>✓</span>
                      <span className={styles.completedText}>Сформирована</span>
                    </span>
                  )}
                </div>
              </div>
              
              <div className={styles.buttonContainer}>
                <HabitButton 
                  text={isCompleted ? "✓ Готово!" : "✓ Отметить день"} 
                  onClick={() => onMark(habit.id)}
                  variant={isCompleted ? "success" : "primary"}
                  className={styles.habitButton}
                  disabled={isCompleted}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
      
      {/* Карточка для добавления новой привычки (без изменений) */}
      {showAddButton && onAddClick && (
        <motion.div 
          className={`${styles.habitCard} ${styles.addCard}`}
          variants={itemVariants}
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onAddClick()}
        >
          <div className={styles.addCardContent}>
            <div className={styles.addIcon}>＋</div>
            <div className={styles.addText}>Добавить привычку</div>
            <div className={styles.addSubtext}>Создать новую привычку</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HabitList;