import { Star } from 'lucide-react';

const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={18}
        fill="#FFC107"
        color="#FFC107"
        className="drop-shadow-sm"
      />
    ))}
  </div>
);

export default StarRating;