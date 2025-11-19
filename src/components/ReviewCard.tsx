import RatingStars from './RatingStars';
import Card from './ui/Card';

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export default function ReviewCard({ name, rating, comment, date, avatar }: ReviewCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-lg font-semibold text-gray-600">{name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <RatingStars rating={rating} showNumber={false} />
          <p className="mt-3 text-gray-600 leading-relaxed">{comment}</p>
        </div>
      </div>
    </Card>
  );
}
