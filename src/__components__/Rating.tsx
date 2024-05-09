import { useState } from 'react';
import { RatingProps } from '../types';

function Rating({ rating, onRatingChange }: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleClick = (selectedRating: number) => {
    onRatingChange(selectedRating);
  };

  const handleMouseEnter = (index:number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  return (
    <div>
      {[...new Array(5)].map((star, index) => {
        return (
          <label
            htmlFor={ `star-${index}` }
            key={ index }
            onMouseEnter={ () => handleMouseEnter(index) }
            onMouseLeave={ handleMouseLeave }
            style={ {
              cursor: 'pointer',
              color: (hoveredRating || rating) >= index ? 'gold' : 'gray',
            } }
          >
            {' '}
            ★
            <input
              type="radio"
              name="star"
              style={ {
                display: 'none',
              } }
              id={ `star-${index}` }
              value={ star }
              data-testid={ `${index}-rating` }
              onClick={ () => handleClick(index) }
            />
          </label>
        );
      })}
    </div>
  );
}

export default Rating;
