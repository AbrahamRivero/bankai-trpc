import { dehydrate } from "@tanstack/react-query";
import { createSSRHelper } from "./api/trpc/trpc-router";
import UserForm from "@/components/user-form";
import ListUsers from "@/components/list-user";
import Hydrate from "@/lib/hydrate-client";

export default async function Home() {
  const helpers = createSSRHelper();
  await helpers.getUsers.prefetch({ limit: 10, page: 1 });

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
        <div className="w-full flex justify-center mb-8">
          <UserForm />
        </div>
        <ListUsers />
      </main>
    </Hydrate>
  );
}
