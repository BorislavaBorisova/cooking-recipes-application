import React, { useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import RecipeDataForm from './RecipeDataForm';


export default function EditRecipeForm() {
  const _id = useParams()._id;
  const [recipe, setRecipe] = useState({});

  if (!recipe._id) {
    const recipeFromStorage = window.localStorage.getItem("recipe_" + _id);
    setRecipe(JSON.parse(recipeFromStorage));
  }

  return (
    <div>
      <Route render={(props) => <RecipeDataForm {...props} _id={recipe._id}
        author_id={recipe.author_id}
        recipe_name={recipe.recipe_name}
        description={recipe.description}
        time_preparation={recipe.time_preparation}
        ingredients={recipe.ingredients}//array
        recipe_picture={recipe.recipe_picture}
        detailed_description={recipe.detailed_description}
        tags={recipe.tags}//array
        time_registration={recipe.time_registration}
        time_last_modification={recipe.time_last_modification} />} />
    </div>
  );
};