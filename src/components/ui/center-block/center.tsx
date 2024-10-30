import { FC, memo } from 'react';

import styles from './center.module.css';

import { TCenterUIProps } from './type';

export const CenterUI: FC<TCenterUIProps> = memo(({ title, children }) => (
  <>
    <div className={styles.center}>
      <div className={styles.header}>
        <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  </>
));
