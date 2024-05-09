import { useState } from 'react';
import { RatingProps } from '../types';

function Rating({ rating, onRatingChange }: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  console.log(rating);

  const handleClick = (selectedRating: number) => {
    onRatingChange(selectedRating);
  };

  const handleMouseEnter = () => {
    setHoveredRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star, index) => {
        return (
          <label
            htmlFor=""
            key={ index }
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
              value={ star }
              data-testid={ `${index}-rating` }
              onClick={ () => handleClick(index) }
              onMouseEnter={ () => handleMouseEnter() }
              onMouseLeave={ handleMouseLeave }
            />
          </label>
        );
      })}
    </div>
  );
}

export default Rating;
