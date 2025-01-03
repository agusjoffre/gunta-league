"use client";
import CreateTeamForm from "@/components/forms/create-team-form";
import PositionsTable from "@/components/positions-table";
import TopScorersTable from "@/components/top-scorers-table";
import TournamentTopCard from "@/components/tournament-topcard";
import TournamentViewSelector from "@/components/tournament-view-selector";
import { useToast } from "@/components/ui/use-toast";
import { getOneTournamentById } from "@/lib/actions/tournament/getOneTournament";
import { Tournament, TournamentTypes } from "@/lib/types.d";
import { Loader2 } from "lucide-react";
import { useQuery } from "react-query";

type Props = {
  params: {
    id: string;
  };
};

const TournamentsPage = ({ params }: Props) => {
  const { id } = params;

  const { toast } = useToast();

  const tournament_id = id;

  const { data: tournamentData, isLoading } = useQuery({
    queryFn: () => getOneTournamentById(tournament_id),
    queryKey: ["tournament", tournament_id],
    onError: (err) =>
      toast({
        title: "Error",
        description:
          "Algo salio mal. Por favor recargue la pagina y espere un momento.",
        variant: "destructive",
      }),
  });

  if (!tournamentData) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-12 pb-10">
        <Loader2 className="animate-spin" />
      </main>
    );
  }

  const {
    name,
    logo_url,
    sport,
    pts_win,
    pts_draw,
    pts_defeat,
    id: tournamentId,
    owner_id,
  } = tournamentData.data as Tournament;

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 pb-10">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <TournamentTopCard
          tournament={{
            logo_url,
            sport,
            name,
            pts_win,
            pts_draw,
            pts_defeat,
            type: TournamentTypes.ROUND_ROBIN,
            id: tournament_id,
          }}
        />
      )}

      <section className="flex gap-72 w-full px-60">
        <div className="flex flex-col gap-2 w-full flex-2">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="italic font-black text-3xl">POSICIONES</h1>
            <div className="max-w-sm h-1 bg-gradient-to-l from-accent/0 to-accent" />
          </div>
          <PositionsTable tournament={tournamentData.data as Tournament} />
        </div>
        <div className="flex flex-col gap-2 w-full flex-1">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="italic font-black text-3xl">GOLEADORES</h1>
            <div className="max-w-sm h-1 bg-gradient-to-l from-accent/0 to-accent" />
          </div>
          <TopScorersTable />
        </div>
      </section>

      <TournamentViewSelector tournamentId={tournament_id} />
    </main>
  );
};

export default TournamentsPage;
