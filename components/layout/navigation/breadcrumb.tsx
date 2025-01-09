import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useUrlSegments } from "@/lib/hooks/use-url-segments";

export function Breadcrumb() {
  const segments = useUrlSegments();

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol role="list" className="flex items-center space-x-2">
        {segments.map((segment, index) => (
          <li key={segment.href}>
            <div className="flex items-center text-sm">
              {!segment.isCurrent ? (
                <Link
                  href={segment.href}
                  className="font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {segment.name}
                </Link>
              ) : (
                <span
                  className="font-semibold text-foreground"
                  aria-current="page"
                >
                  {segment.name}
                </span>
              )}
              {index < segments.length - 1 && (
                <ChevronRight
                  className="ml-2 h-5 w-5 flex-shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
