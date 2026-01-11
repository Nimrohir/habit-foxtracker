// src/components/HabitButton/HabitButton.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HabitButton.module.scss';

interface HabitButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  disabled?: boolean;
  className?: string;
}

const HabitButton: React.FC<HabitButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  disabled = false,
  className = ''
}) => {
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    },
    disabled: {
      opacity: 0.6,
      cursor: "not-allowed"
    }
  };

  return (
    <motion.button
      className={`${styles.habitButton} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      animate={disabled ? "disabled" : undefined}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.button>
  );
};

export default HabitButton;