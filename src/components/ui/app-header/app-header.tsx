import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Link } from 'react-router-dom';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link
          to='/'
          style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}
        >
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </Link>
        <Link
          to='/feed'
          style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}
        >
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </Link>
      </div>
      <div className={styles.logo}>
        <Link
          to='/'
          style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}
        >
          <Logo className='' />
        </Link>
      </div>
      <div className={styles.link_position_last}>
        <Link
          to='/profile'
          style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </div>
    </nav>
  </header>
);
