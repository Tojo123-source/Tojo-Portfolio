import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 16 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'text-[#f4a261] fill-[#f4a261]' : 'text-[#94a3b8]/30'}
        />
      ))}
    </div>
  );
}
