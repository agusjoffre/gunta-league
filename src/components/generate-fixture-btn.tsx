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
import { useMutation } from "react-query";
import { getAllTeamsFromTournamentId } from "@/lib/actions/teamsActions";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import { generatePairings } from "@/lib/generatePairings";
import { getOneTournamentById } from "@/lib/actions/tournamentActions";

type Props = {
  tournamentId: string;
};

const GenerateFixtureBtn = ({ tournamentId }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  // get teams from tournamentId
  const {
    data: teamsData,
    isLoading: isLoadingTeams,
    mutate: getTeams,
  } = useMutation({
    mutationFn: async (tournamentId: string) =>
      getAllTeamsFromTournamentId(tournamentId),
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
  const {
    data: tournamentData,
    mutate: getTournament,
    isLoading: isLoadingTournament,
  } = useMutation({
    mutationFn: async (tournamentId: string) =>
      getOneTournamentById(tournamentId),
    onError(err: any) {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal con el fetch de torneo.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    getTeams(tournamentId);
    getTournament(tournamentId);
  }, [getTeams, tournamentId, getTournament]);

  // create matchdays
  // create matches

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
      <DialogTrigger className="font-black italic w-fit py-3 px-6 rounded-full text-accent-foreground bg-accent hover:bg-accent/80 hover:text-accent-foreground transition-all ease-in-out">
        GENERAR FIXTURE
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
