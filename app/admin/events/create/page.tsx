import { dehydrate } from "@tanstack/react-query";
import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import Hydrate from "@/lib/hydrate-client";
import CreateEventForm from "@/components/forms/create-event-form";

export default async function EventsPage() {
  const helpers = createSSRHelper();
  await helpers.getEventCategories.prefetch();
  await helpers.getLocations.prefetch();

  return (
    <div className="min-h-screen bg-white">
      <Hydrate state={dehydrate(helpers.queryClient)}>
        <main>
          <CreateEventForm />
        </main>
      </Hydrate>
    </div>
  );
}
