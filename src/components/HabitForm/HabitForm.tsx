import React, { useState } from 'react';
import styles from './HabitForm.module.scss';
import HabitButton from '../HabitButton/HabitButton';

interface HabitFormProps {
  onAdd: (name: string, description?: string, category?: string) => void;
  onCancel?: () => void; // Новый пропс для закрытия формы
  categories?: string[];
}

const HabitForm: React.FC<HabitFormProps> = ({ 
  onAdd, 
  onCancel,
  categories = ['Здоровье', 'Развитие', 'Работа', 'Отдых'] 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Введите название привычки');
      return;
    }

    if (name.length > 50) {
      setError('Название не должно превышать 50 символов');
      return;
    }

    onAdd(name.trim(), description.trim(), category);
    
    // Сброс формы
    setName('');
    setDescription('');
    setCategory('');
  };

  const handleCancel = () => {
    // Сброс формы
    setName('');
    setDescription('');
    setCategory('');
    setError('');
    
    // Вызов колбэка для закрытия формы, если он передан
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>➕ Добавить новую привычку</h3>
      
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Название привычки *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          maxLength={50}
        />
        <div className={styles.charCount}>{name.length}/50</div>
      </div>

      <div className={styles.formGroup}>
        <textarea
          placeholder="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Категория:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.buttonGroup}>
        {onCancel && (
          <HabitButton 
            text="Отмена" 
            onClick={handleCancel}
            variant="secondary"
            className={styles.cancelButton}
          />
        )}
        <HabitButton 
          text="Добавить привычку" 
          onClick={handleSubmit}
          variant="primary"
          className={styles.submitButton}
        />
      </div>
    </form>
  );
};

export default HabitForm;