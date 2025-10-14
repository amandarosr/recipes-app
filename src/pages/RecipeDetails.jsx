import 'pure-react-carousel/dist/react-carousel.es.css';
import { useCallback, useContext, useEffect } from 'react';
import {
  useHistory,
  useLocation, useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import CardRecipeDetails from '../components/CardRecipeDetails';
import RecipeContext from '../context/RecipeContext';
import '../css/RecipeDetails.css';
import { fetchDrinks, fetchMeals } from '../services/fetchAPI';
import home from "../images/home.png"

export default function RecipeDetails() {
  const { setRecomended } = useContext(RecipeContext);

  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const fetchRecomended = useCallback(async () => {
    const maxNumber = 6;
    const recipesRec = pathname.includes('/meals')
      ? await fetchDrinks() : await fetchMeals();

    setRecomended(recipesRec.slice(0, maxNumber));
  }, [pathname, setRecomended]);

  useEffect(() => {
    fetchRecomended();
  }, [fetchRecomended]);

  const verifyTextButton = () => {
    const recipes = localStorage.getItem('inProgressRecipes') || '';
    if (recipes && recipes.includes(id)) {
      return 'Continue Recipe';
    }
    return 'Start Recipe';
  };

  return (
    <div className="details__page">
      <div className="mobile-container">
        <span className="top-btns-container">
          <button onClick={() => history.push("/meals")} className="top-btn">
            <img src={home} alt="homepage" className="homeBtn"/>
          </button>
          <ButtonFavorite />
          <ButtonShare testid="share-btn" />
        </span>
        <CardRecipeDetails />
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start"
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          { verifyTextButton() }
        </button>
      </div>
    </div>
  );
}
