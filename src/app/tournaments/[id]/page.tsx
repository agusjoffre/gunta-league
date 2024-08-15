"use client";
import CreateTeamForm from "@/components/forms/create-team-form";
import PositionsTable from "@/components/positions-table";
import TopScorersTable from "@/components/top-scorers-table";
import TournamentTopCard from "@/components/tournament-topcard";
import TournamentViewSelector from "@/components/tournament-view-selector";
import { TournamentTypes } from "@/lib/types.d";

type Props = {
  params: {
    id: string;
  };
};

const TournamentsPage = ({ params }: Props) => {
  const { id } = params;

  const tournament_id = id;

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 pb-10">
      <TournamentTopCard
        tournament={{
          name: "Torneo 1",
          pts_defeat: 0,
          pts_draw: 0,
          pts_win: 0,
          type: TournamentTypes.ROUND_ROBIN,
          id: tournament_id,
        }}
      />
      <section className="flex gap-72 w-full px-60">
        <div className="flex flex-col gap-2 w-full flex-2">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="italic font-black text-3xl">POSICIONES</h1>
            <div className="max-w-sm h-1 bg-gradient-to-l from-accent/0 to-accent" />
          </div>
          <PositionsTable />
        </div>
        <div className="flex flex-col gap-2 w-full flex-1">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="italic font-black text-3xl">GOLEADORES</h1>
            <div className="max-w-sm h-1 bg-gradient-to-l from-accent/0 to-accent" />
          </div>
          <TopScorersTable />
        </div>
      </section>

      <TournamentViewSelector />
    </main>
  );
};

export default TournamentsPage;
