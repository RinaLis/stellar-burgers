import { FC } from 'react';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useParams } from 'react-router-dom';
import { getIngredientsState } from '@slices';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingridientId = useParams().id;

  const { ingredients } = useSelector(getIngredientsState);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingridientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
