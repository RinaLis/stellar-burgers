import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders, getUserOrdersSelector } from '@slices';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isOrdersLoading } = useSelector(getUserOrdersSelector);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <>{isOrdersLoading ? <Preloader /> : <ProfileOrdersUI orders={orders} />}</>
  );
};
