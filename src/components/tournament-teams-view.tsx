"use client";

import { getAllTeamsFromTournamentId } from "@/lib/actions/team/teamsActions";
import { Team } from "@/lib/types";
import { useQuery } from "react-query";
import TeamCard from "./team-card";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import CreateTeamForm from "./forms/create-team-form";

type Props = {
  tournament_id: string;
};

const TournamentTeamsView = ({ tournament_id }: Props) => {
  // get teams from tournament_id

  const { data, isLoading } = useQuery({
    queryFn: () => getAllTeamsFromTournamentId(tournament_id),
    queryKey: ["teamsFromTournament", tournament_id],
  });

  const teams = data?.data as Team[];

  // display TeamCards
  return (
    <div className="flex flex-col gap-8 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"accent"} className="w-fit">
            CREAR EQUIPO
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agrega un equipo al torneo</DialogTitle>
            <DialogDescription>
              Aqui puedes agregar un equipo al torneo
            </DialogDescription>
          </DialogHeader>
          <CreateTeamForm tournament_id={tournament_id} />
        </DialogContent>
      </Dialog>

      {!teams || teams.length === 0 ? (
        <p className="text-lg text-center italic text-foreground/75">
          No hay equipos en este torneo
        </p>
      ) : isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="grid grid-cols-8 gap-14 min-w-96">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentTeamsView;
