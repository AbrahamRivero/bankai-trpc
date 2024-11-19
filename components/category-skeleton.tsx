import { Card, CardContent } from "@/components/ui/card";

export default function CategorySkeleton() {
  return (
    <Card className="group overflow-hidden bg-white">
      <div className="relative block h-48">
        {/* Skeleton for image */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        {/* Skeleton for gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-300/60 to-transparent" />
        <CardContent className="absolute bottom-0 left-0 right-0 p-2">
          {/* Skeleton for text */}
          <div className="h-6 w-32 mx-auto bg-gray-300 rounded animate-pulse" />
        </CardContent>
      </div>
    </Card>
  );
}
