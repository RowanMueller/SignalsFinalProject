import { TicCompressor } from "~/app/_components/tic-compressor";
import { api, HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  void api.compression.listResults.prefetch({ take: 15 });

  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-950 text-zinc-200">
        <TicCompressor />
      </main>
    </HydrateClient>
  );
}
