"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import { Team, Tournament, TournamentTypes } from "@/lib/types.d";
import Image from "next/image";
import { useMutation } from "react-query";
import { getAllTeamsFromTournamentId } from "@/lib/actions/team/teamsActions";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";

type Props = {
  tournament: Tournament;
};

const TournamentInfoCard = ({ tournament }: Props) => {
  // get teams from tournament.id

  const { toast } = useToast();

  const { data, mutate, isLoading } = useMutation({
    mutationFn: async (tournamentId: string) =>
      getAllTeamsFromTournamentId(tournamentId),
    onError(err: any) {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal.",
        variant: "destructive",
      });
    },
  });

  if (!tournament.id || typeof tournament.id !== "string")
    toast({
      title: "Error",
      description: "Algo salio mal.",
      variant: "destructive",
    });

  const tournamentId = tournament.id as string;

  useEffect(() => {
    mutate(tournamentId);
  }, [mutate, tournamentId]);

  const teams = (data?.data as Team[]) || [];

  return (
    <Card className="w-[355px]">
      <CardHeader className="flex flex-col items-center justify-center">
        {tournament.logo_url ? (
          <Image
            alt="tournament logo"
            src={tournament.logo_url}
            width={96}
            height={96}
          />
        ) : (
          <div className="min-h-24 min-w-24 bg-gradient-to-l from-accent/0 to-accent rounded-full" />
        )}

        <CardTitle className="font-black italic text-3xl text-accent">
          {tournament.name}
        </CardTitle>
        <div className="pt-7 flex flex-col gap-3 w-full">
          {tournament.sport && (
            <div className="flex justify-between">
              <span className="text-foreground text-sm font-medium">
                DEPORTE
              </span>
              <span className="text-foreground text-sm font-medium">
                {tournament.sport}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-foreground text-sm font-medium">FORMATO</span>
            <span className="text-foreground text-sm font-medium">
              {tournament.type === TournamentTypes.ROUND_ROBIN
                ? "Todos contra todos"
                : tournament.type === TournamentTypes.ELIMINATION
                ? "Eliminatoria"
                : tournament.type === TournamentTypes.GROUP_PHASE_ELIMINATION
                ? "Fase de grupos y eliminatoria"
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground text-sm font-medium">EQUIPOS</span>
            <span className="text-foreground text-sm font-medium">
              {teams.length}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          disabled
          value={tournament.description || "No hay descripción"}
          className="w-full font-medium italic max-h-36 min-h-36"
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant={"linearAccent"} className="font-bold italic text-sm">
          EDITAR
        </Button>
        <Link href={`/tournaments/${tournament.id}`}>
          <Button variant={"accent"}>IR AL TORNEO</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TournamentInfoCard;
