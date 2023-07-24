import PropTypes from 'prop-types';
import IngredientsList from './IngredientsList';

export function RenderButtons({ isVisible,
  setVisible, icon, title, recipe, isInProgress }) {
  const animateOpen = 'animate-open';
  return (
    <div>
      {' '}
      <button
        className="btn-design lg:w-[100%] "
        onClick={ () => {
          setVisible(!isVisible);
          console.log(isVisible);
        } }
      >
        {icon()}
        <h4 className="p-1 tam-title">{title}</h4>
      </button>
      {isVisible && (
        <div className={ `${isVisible ? animateOpen : 'h-0'} ` }>
          {title === 'Ingredients' ? (
            <ul
              className={ `text-sm p-0 ${isVisible ? animateOpen : 'h-0'}
       ` }
            >
              <IngredientsList recipe={ recipe } isInProgress={ isInProgress } />
            </ul>
          ) : (
            <div className={ isVisible ? animateOpen : 'h-0' }>
              <p
                className="text-white"
                data-testid="instructions"
              >
                {recipe.strInstructions}

              </p>
              {recipe.strYoutube && (
                <div
                  data-testid="video"
                  className="flex items-end rounded-xl mt-7 w-[100%] bg-black "
                >
                  <iframe
                    className="rounded-xl w-[100%] opacity-60 lg:h-96"
                    src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
                    title="Recipe Video"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

RenderButtons.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isInProgress: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    strInstructions: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
};
