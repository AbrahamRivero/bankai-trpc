import { Card } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <div className="bg-white rounded-lg overflow-hidden shadow-md block">
        <div className="relative w-full">
          <div className="w-full h-64 bg-gray-200 animate-pulse" />

          <span className="absolute top-4 left-4 h-8 w-14 bg-gray-500/70 px-2 py-1 rounded sm:inline-flex bg-clip-padding backdrop-filter backdrop-blur-md border" />

          <span className="absolute top-4 right-4 h-8 w-14 bg-gray-500/70 px-2 py-1 rounded sm:inline-flex bg-clip-padding backdrop-filter backdrop-blur-md border" />

          <div className="absolute bottom-4 left-4 right-4 hidden sm:flex justify-between">
            <div className="h-10 w-10 bg-gray-500/70 rounded-md" />

            <div className="flex space-x-2">
              <div className="h-10 w-10 bg-gray-500/70 rounded-md" />
              <div className="h-10 w-10 bg-gray-500/70 rounded-md" />
            </div>
          </div>
        </div>
        <div className="p-4 w-full relative">
          <div className="h-6 w-full bg-gray-200 mb-1 rounded-md animate-pulse" />
          <div className="h-6 w-[120px] bg-gray-200 mb-2 rounded-md animate-pulse" />
          <div className="h-6 w-[60px] bg-gray-200 rounded-md animate-pulse" />

          <div className="absolute bottom-32 left-4 right-4 flex sm:hidden justify-between">
            <div className="h-10 w-10 bg-gray-500/70 rounded-md" />
            <div className="flex space-x-2">
              <div className="h-10 w-10 bg-gray-500/70 rounded-md" />
              <div className="h-10 w-10 bg-gray-500/70 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
