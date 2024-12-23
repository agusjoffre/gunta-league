"use client";
import { Team, Tournament } from "@/lib/types.d";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "react-query";
import { getAllTeamsFromTournamentId } from "@/lib/actions/team/teamsActions";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import { generatePairings } from "@/lib/generatePairings";
import { getOneTournamentById } from "@/lib/actions/tournament/getOneTournament";

type Props = {
  tournamentId: string;
};

const GenerateFixtureBtn = ({ tournamentId }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  // get teams from tournamentId
  const { data: teamsData, isLoading: isLoadingTeams } = useQuery({
    queryKey: ["teams", tournamentId],
    queryFn: async () => getAllTeamsFromTournamentId(tournamentId),
    onError(err: any) {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal con el fetch de equipos.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      setDialogOpen(false);
    },
  });

  // get tournament by id
  const { data: tournamentData, isLoading: isLoadingTournament } = useQuery({
    queryKey: ["tournament", tournamentId],
    queryFn: () => getOneTournamentById(tournamentId),
    onError(err: any) {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal con el fetch de torneo.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      setDialogOpen(false);
    },
  });

  // create matchdays
  // create matches

  const teams = teamsData?.data as Team[];

  function handleGenerateFixture() {
    const teams = teamsData?.data as Team[];
    const tournament = tournamentData?.data as Tournament;

    const fixture = generatePairings(teams, tournament.type);
    console.log(fixture);

    const rounds = fixture.map((match) => match.round);
    const numberOfRounds = Math.max(...rounds);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        asChild
        disabled={isLoadingTeams || isLoadingTournament || teams.length < 2}
        className=""
      >
        <Button variant={"accent"}>GENERAR FIXTURE</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estas seguro?</DialogTitle>
          <DialogDescription>
            Si aceptas, se eliminaran todos los partidos y resultados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoadingTeams || isLoadingTournament}
            variant={"accent"}
            onClick={handleGenerateFixture}
          >
            GENERAR
          </Button>
          <Button variant={"destructive"}>CANCELAR</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateFixtureBtn;
