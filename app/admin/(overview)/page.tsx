import { createSSRHelper } from "../../api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatsContainer from "@/components/stats-container";
import Hydrate from "@/lib/hydrate-client";
import { CategoriesPieChart } from "@/components/pie-chart";
import { IndicatorsBarChart } from "@/components/bar-chart";

export default async function AdminPage() {
  const helpers = createSSRHelper();
  await helpers.getCategories.prefetch();
  await helpers.getLatestProducts.prefetch();

  return (
    <div className="min-h-screen bg-white">
      <Hydrate state={dehydrate(helpers.queryClient)}>
        <main>
          <StatsContainer />
          <div className="min-h-[100vh] min-w-full flex-1 rounded-xl md:min-h-min mt-8 grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src="/c80b76ea-a46c-415a-aa84-b491f07683b7.webp"
                        alt="Avatar"
                      />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Olivia Martin
                      </p>
                      <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src="/c80b76ea-a46c-415a-aa84-b491f07683b7.webp"
                        alt="Avatar"
                      />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Jackson Lee
                      </p>
                      <p className="text-sm text-muted-foreground">
                        jackson.lee@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src="/c80b76ea-a46c-415a-aa84-b491f07683b7.webp"
                        alt="Avatar"
                      />
                      <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Isabella Nguyen
                      </p>
                      <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$299.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src="/c80b76ea-a46c-415a-aa84-b491f07683b7.webp"
                        alt="Avatar"
                      />
                      <AvatarFallback>WK</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        William Kim
                      </p>
                      <p className="text-sm text-muted-foreground">
                        will@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$99.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src="/c80b76ea-a46c-415a-aa84-b491f07683b7.webp"
                        alt="Avatar"
                      />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Sofia Davis
                      </p>
                      <p className="text-sm text-muted-foreground">
                        sofia.davis@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                  </div>
                </CardContent>
              </Card>
              <CategoriesPieChart />
            </div>
            <IndicatorsBarChart />
          </div>
        </main>
      </Hydrate>
    </div>
  );
}
