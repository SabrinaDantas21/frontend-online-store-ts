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
            htmlFor={ `star-${index + 1}` }
            key={ index }
            onMouseEnter={ () => handleMouseEnter(index) }
            onMouseLeave={ handleMouseLeave }
            data-testid={ `${index + 1}-rating` }
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
              id={ `star-${index + 1}` }
              value={ index + 1 }
              onClick={ () => handleClick(index) }
            />
          </label>
        );
      })}
    </div>
  );
}

export default Rating;
