import { FC, useMemo } from 'react';
import { TConstructorIngredient, TUser } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import {
  fetchAddOrder,
  getConstructorState,
  setNullOrderModalData,
  setOrderRequest,
  userDataSelector
} from '@slices';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector) as TUser;
  const { constructorItems, orderRequest, orderModalData } =
    useSelector(getConstructorState);

  const onOrderClick = () => {
    if (constructorItems.bun && !user) navigate('/login');
    if (constructorItems.bun && user) {
      dispatch(setOrderRequest(true));

      const bunId = constructorItems.bun._id;
      const ingredientsIds = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId, ...ingredientsIds, bunId];
      dispatch(fetchAddOrder(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(setNullOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
