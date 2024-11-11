const DiscountBadge = ({ percentage }: { percentage?: number }) => (
  <div className="absolute top-2 left-2 z-20 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
    {percentage}% OFF
  </div>
);

export default DiscountBadge;
