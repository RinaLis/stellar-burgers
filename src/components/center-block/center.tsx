import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TCenterProps } from './type';
import { CenterUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const Center: FC<TCenterProps> = memo(({ title, children }) =>
  ReactDOM.createPortal(
    <CenterUI title={title}>{children}</CenterUI>,
    modalRoot as HTMLDivElement
  )
);
