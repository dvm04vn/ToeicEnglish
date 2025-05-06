import React from 'react';
import styles from './Home.module.scss';

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.title}>TOEIC Learning Platform</h1>
        <p className={styles.subtitle}>Free TOEIC practice for students</p>
        <button className={styles.startBtn}>Start Learning</button>
      </div>
    </div>
  );
}

export default Home;
