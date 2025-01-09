import { MapPinIcon } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const LocationContainer = ({
  location,
}: {
  location: { name: string; address: string } | null;
}) => {
  return (
    <>
      <div className="hidden items-center space-x-2 text-sm lg:flex">
        <MapPinIcon className="w-4 h-4" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span>{location?.name}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{location?.address}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center space-x-2 text-sm lg:hidden">
        <MapPinIcon className="w-4 h-4" />
        <Popover>
          <PopoverTrigger>
            <span>{location?.name}</span>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm">{location?.address}</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default LocationContainer;
