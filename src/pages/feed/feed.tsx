import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchAllOrders, getFeedState } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isOrdersLoading } = useSelector(getFeedState);

  const handleGetFeeds = () => {
    dispatch(fetchAllOrders());
  };

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <>
      {isOrdersLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      )}
    </>
  );
};
