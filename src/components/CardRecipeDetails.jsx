import React, { useCallback, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import RecipeContext from "../context/RecipeContext";
import "../css/CardRecipeDetails.css";
import { getRecipesId } from "../services/fetchAPI";
import IngredientCheckbox from "./IngredientCheckbox";

export default function CardRecipeDetails() {
  const { listIngredients, setListIngredients, recipe, setRecipe } =
    useContext(RecipeContext);

  const { pathname } = useLocation();
  const { id } = useParams();

  const getIngredientsAndMeasure = useCallback(
    (receita) => {
      const ingredient =
        receita &&
        Object.entries(receita)
          .filter(([key, value]) => key.includes("strIngredient") && value)
          .map((entry) => entry[1]);

      const measure =
        receita &&
        Object.entries(receita)
          .filter(([key, value]) => key.includes("strMeasure") && value)
          .map((entry) => entry[1]);

      const list =
        ingredient &&
        ingredient.map(
          (ingrediente, index) => `${ingrediente} - ${measure[index]}`
        );

      setListIngredients(list);
    },
    [setListIngredients]
  );

  const fetchProduct = useCallback(async () => {
    const recipeID = await getRecipesId(id, pathname);
    setRecipe(recipeID);
    getIngredientsAndMeasure(recipeID);
  }, [id, pathname, setRecipe, getIngredientsAndMeasure]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const videoStyle = {
    bottom: "15px",
    padding: "10px",
    position: "relative",
    marginLeft: "31px",
    zIndex: "1",
  };

  return (
    <div className="card-details">
      {recipe && (
        <div>
          <div className="details-title">
            <h1 data-testid="recipe-title">
              {recipe.strMeal || recipe.strDrink}
            </h1>
            <p data-testid="recipe-category">
              {recipe.strAlcoholic || recipe.strCategory}
            </p>
          </div>
          <div className="section-one">
            <img
              src={recipe.strMealThumb || recipe.strDrinkThumb}
              alt="fotoReceita"
              data-testid="recipe-photo"
              className="mainPic"
            />
            <p data-testid="instructions" className="instructions">
              {recipe.strInstructions}
            </p>
          </div>
          <div className="section-two">
            <ul className="ingredients-container">
              {listIngredients &&
                listIngredients.map((ingrediente, index) =>
                  pathname.includes("in-progress") ? (
                    <IngredientCheckbox
                      key={index}
                      ingrediente={ingrediente}
                      index={index}
                    />
                  ) : (
                    <li
                      key={index}
                      data-testid={`${index}-ingredient-name-and-measure`}
                    >
                      {ingrediente}
                    </li>
                  )
                )}
            </ul>
            {recipe && pathname.includes("/meals") && (
              <div className="section-three">
                <ReactPlayer
                  width="360px"
                  height="212px"
                  style={videoStyle}
                  data-testid="video"
                  url={recipe.strYoutube}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
