import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  // Анимации для лисьих следов
  const foxPaws = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 90 + 5, // 5-95%
    y: Math.random() * 90 + 5,
    delay: i * 0.3,
    duration: 4 + Math.random() * 3
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const textGlowVariants = {
    hidden: { opacity: 0.7 },
    visible: {
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={styles.homePage}>
      {/* Анимированные лисьи следы */}
      <div className={styles.foxPawTrail}>
        {foxPaws.map((paw) => (
          <motion.div
            key={paw.id}
            className={styles.foxPaw}
            style={{
              left: `${paw.x}%`,
              top: `${paw.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: paw.duration,
              delay: paw.delay,
              repeat: Infinity,
              repeatDelay: 10,
              ease: "easeInOut"
            }}
          >
            🐾
          </motion.div>
        ))}
      </div>

      {/* Основной контент */}
      <motion.div 
        className={styles.contentWrapper}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Заголовок с лисьей тематикой */}
        <motion.div className={styles.titleContainer}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            Добро пожаловать в <span className={styles.titleHighlight}>Habit FoxTracker</span>
          </motion.h1>
        </motion.div>

        {/* Выразительный подзаголовок */}
        <motion.div
          className={styles.subtitleContainer}
          variants={itemVariants}
        >
          <motion.h2 
            className={styles.subtitle}
            variants={textGlowVariants}
            initial="hidden"
            animate="visible"
          >
            Ловите хвост полезных привычек и оставляйте следы из своих побед!
          </motion.h2>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Каждый день — новый шаг к лучшей версии себя. 
            Начните свой путь к преображению прямо сейчас и превратите 
            маленькие ежедневные действия в мощные ритуалы успеха!
          </motion.p>
        </motion.div>

        {/* Статистика в стилизованных карточках */}
        <motion.div 
          className={styles.stats}
          variants={itemVariants}
        >
          <motion.div
            className={styles.statCard}
            initial={{ scale: 0, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              boxShadow: "0 15px 30px rgba(229, 122, 0, 0.25)"
            }}
          >
            <div className={styles.statContent}>
              <motion.div 
                className={styles.statIcon}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                📅
              </motion.div>
              <span className={styles.statNumber}>21</span>
              <span className={styles.statLabel}>день на формирование привычки</span>
            </div>
          </motion.div>
          
          <motion.div
            className={styles.statCard}
            initial={{ scale: 0, rotate: 5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              boxShadow: "0 15px 30px rgba(229, 122, 0, 0.25)"
            }}
          >
            <div className={styles.statContent}>
              <motion.div 
                className={styles.statIcon}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📈
              </motion.div>
              <span className={styles.statNumber}>95%</span>
              <span className={styles.statLabel}>успешность при регулярном трекинге</span>
              <div className={styles.statProgress}>
                <motion.div 
                  className={styles.progressBar}
                  initial={{ width: 0 }}
                  animate={{ width: "95%" }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Главная кнопка */}
        <motion.div
          className={styles.buttonWrapper}
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to="/habits" className={styles.ctaButton}>
              <motion.span
                animate={{ 
                  x: [0, 5, 0],
                  transition: { 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                Отправиться в охоту на полезные привычки
              </motion.span>
              <motion.div 
                className={styles.buttonTrail}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Особенности */}
        {/* Особенности - 2 квадрата в строке */}
<motion.div 
  className={styles.features}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
>
  <h2 className={styles.featuresTitle}>Что делает FoxTracker таким особенным?</h2>
  <div className={styles.featuresGrid}>
    {[
      { 
        icon: '✅', 
        title: 'Умное отслеживание', 
        desc: 'Следим за вашим прогрессом как лиса за добычей',
        color: '#4CAF50'
      },
      { 
        icon: '📊', 
        title: 'Хитрые графики', 
        desc: 'Наглядная статистика, которая покажет все ваши следы успеха',
        color: '#2196F3'
      },
      { 
        icon: '🔔', 
        title: 'Напоминания', 
        desc: 'Не дадим забыть о важных привычках',
        color: '#FF9800'
      },
      { 
        icon: '🎯', 
        title: 'Четкие цели', 
        desc: 'Ставьте цели и достигайте их с хитростью и упорством',
        color: '#9C27B0'
      }
    ].map((feature, index) => (
      <motion.div
        key={index}
        className={styles.featureCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 + index * 0.1 }}
        whileHover={{ 
          scale: 1.05, 
          y: -5,
          transition: { type: "spring", stiffness: 400 }
        }}
      >
        <motion.div 
          className={styles.featureIcon}
          style={{ 
            backgroundColor: `${feature.color}15`,
            borderColor: feature.color
          }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {feature.icon}
        </motion.div>
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </motion.div>
    ))}
  </div>
</motion.div>

        {/* Как это работает */}
        <motion.div 
          className={styles.extraContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <h2>Как бежит наша лиса к успеху?</h2>
          <div className={styles.steps}>
            {[
              { 
                number: '1', 
                title: 'Найдите след привычки', 
                desc: 'Выберите привычку, которую хотите выработать - это ваш первый след на пути',
                icon: '🔍'
              },
              { 
                number: '2', 
                title: 'Оставляйте следы каждый день', 
                desc: 'Отмечайте каждый день выполнения ваших привычек',
                icon: '🐾'
              },
              { 
                number: '3', 
                title: 'Достигайте успеха', 
                desc: 'Через 21 день привычка станет вашей второй натурой - как рыжий мех для лисы',
                icon: '🏠'
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className={styles.step}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(229, 122, 0, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Призыв к действию */}
        <motion.div 
          className={styles.callToAction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.h3
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Готовы начать свою охоту за полезными привычками?
          </motion.h3>
          <p>Превратите свои цели в достижения с помощью простого и эффективного трекера привычек!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;