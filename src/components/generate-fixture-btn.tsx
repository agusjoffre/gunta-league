"use client";
import { Match, MatchDay, Team, Tournament } from "@/lib/types.d";
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
import {
  createMatchday,
  MatchDayResponse,
} from "@/lib/actions/matchday/createMatchday";
import { createMatch } from "@/lib/actions/matchesActions";
import { generateFixture } from "@/lib/generateFixture";

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
        description: "Algo salio mal con el fetch de equipos.",
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
        description: "Algo salio mal con el fetch de torneo.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      setDialogOpen(false);
    },
  });

  // create matchdays
  const { mutateAsync: mutateMatchDay, isLoading: isLoadingMatchday } =
    useMutation({
      mutationFn: async (matchdayData: MatchDay) =>
        await createMatchday(tournamentId, matchdayData),
      onSuccess: (data) => {
        setDialogOpen(false);

        if (!data.success) {
          toast({
            title: data.message,
            description: `${data.error}. Por favor intentalo de nuevo.`,
            variant: "destructive",
          });
        }
        const matchdayData = data.data as MatchDay;
        toast({
          title: "Fecha creada con exito!",
          description: `Fecha ${matchdayData.number}`,
          variant: "success",
        });
      },
      onError(err: any) {
        toast({
          title: "Error",
          description: err.message || "Algo salio mal con el fetch de fechas.",
          variant: "destructive",
        });
      },
    });

  // create matches
  const { mutateAsync: mutateMatch, isLoading: isLoadingMatch } = useMutation({
    mutationFn: async (matchData: Match) => await createMatch(matchData),
    onSuccess: (data) => {
      setDialogOpen(false);

      if (!data.success) {
        toast({
          title: data.message,
          description: `${data.error}. Por favor intentalo de nuevo.`,
          variant: "destructive",
        });
      }

      const match = data.data as Match;
      toast({
        title: "Partido creado con exito!",
        description: `${match.home_id} vs ${match.away_id}`,
        variant: "success",
      });
    },
    onError(err: any) {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal con el fetch de partidos.",
        variant: "destructive",
      });
    },
  });

  const teams = teamsData?.data as Team[];

  const handleGenerateFixture = async () => {
    setDialogOpen(false);

    if (!teamsData || !tournamentData) return;

    const tournament = tournamentData.data as Tournament;

    await generateFixture(
      teams,
      tournamentId,
      tournament.type,
      mutateMatchDay,
      mutateMatch
    );

    toast({
      title: "Fixture generado con exito!",
      description: "Partidos creados con exito.",
      variant: "success",
    });
  };

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
