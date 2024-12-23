"use query";
import { getAllTeamsFromTournamentId } from "@/lib/actions/team/teamsActions";
import { Button } from "./ui/button";
import { Team, Tournament } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useToast } from "./ui/use-toast";
import { Loader2, LucideBrickWall } from "lucide-react";

type Props = {
  tournament: Tournament;
};

const TournamentTopCard = ({ tournament }: Props) => {
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryFn: () => getAllTeamsFromTournamentId(tournament.id as string),
    queryKey: ["teamsFromTournament", tournament.id],
  });

  const tournamentId = tournament.id as string;

  const teams = (data?.data as Team[]) || [];

  return (
    <div className="league-card-gradient w-full h-56 flex flex-col gap-5 justify-between pt-10 py-4 pr-4">
      <div className="flex items-center gap-16 px-48">
        <div className="flex items-center gap-4">
          {tournament.logo_url ? (
            <Image
              alt="league logo"
              src={tournament.logo_url}
              width={96}
              height={96}
              className="rounded-xl min-h-24 min-w-24"
            />
          ) : (
            <div className="rounded-full min-w-24 min-h-24 bg-gradient-to-r from-primary/45 to-background/45 flex flex-col items-center justify-center">
              <LucideBrickWall />
              <p className="text-xs">{tournament.sport || "Torneo"}</p>
            </div>
          )}

          <h1 className="text-wrap italic font-black text-4xl">
            {tournament.name}
          </h1>
        </div>

        <div className="flex flex-col items-center border-r-2 border-accent/15 pr-10">
          <h1 className="font-medium text-7xl">{teams.length}</h1>
          <h3 className="font-medium text-lg">EQUIPOS</h3>
        </div>
        <div className="flex items-center gap-6">
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-foreground" />
          ) : (
            teams.length > 0 &&
            teams.map((team) => {
              return (
                <Link
                  href={`/tournaments/${tournament.id}/teams/${team.id}`}
                  key={team.id}
                  className="hover:scale-110 transition-all cursor-pointer"
                >
                  <div className="flex flex-col italic items-center gap-2">
                    <Image
                      alt="league logo"
                      src={team.logo_url || "/liga_gunta_2.png"}
                      width={64}
                      height={64}
                      className="rounded-full min-h-16 min-w-16"
                    />
                    <span className="font-bold text-xs">{team.name}</span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Button
          variant={"secondary"}
          className="font-semibold rounded-full py-1 px-5 bg-white/25 text-foreground"
        >
          Editar torneo
        </Button>
      </div>
    </div>
  );
};

export default TournamentTopCard;
