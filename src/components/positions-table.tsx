"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllTeamsFromTournamentId } from "@/lib/actions/team/teamsActions";
import { Match, MatchDay, Team, Tournament } from "@/lib/types";
import Image from "next/image";
import { useQuery } from "react-query";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { calculatePositions } from "@/lib/calculatePositions";
import { getAllMatchesFromTournament } from "@/lib/actions/matchesActions";

type Props = {
  tournament: Tournament;
};

const PositionsTable = ({ tournament }: Props) => {
  const { toast } = useToast();

  const { data: teamsData, isLoading: isLoadingTeams } = useQuery({
    queryFn: () => getAllTeamsFromTournamentId(tournament.id!),
    queryKey: ["teams", tournament.id],
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal con el fetch de equipos.",
        variant: "destructive",
      });
    },
  });

  const { data: matchesData, isLoading: isLoadingMatches } = useQuery({
    queryFn: () => getAllMatchesFromTournament(tournament.id!),
    queryKey: ["matches", tournament.id],
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal con el fetch de partidos.",
        variant: "destructive",
      });
    },
  });

  const teams = teamsData?.data as Team[];

  const matches = matchesData?.data as Match[];

  const { data: positionsData, isLoading: isLoadingPositions } = useQuery({
    queryFn: () => calculatePositions(tournament, teams, matches),
    queryKey: ["positions", tournament.id],
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description:
          err.message || "Algo salio mal con el fetch de posiciones.",
        variant: "destructive",
      });
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow className="font-bold text-lg italic">
          <TableHead className="w-4 text-foreground">Pos</TableHead>
          <TableHead className="text-foreground">Equipo</TableHead>
          <TableHead className="text-foreground">PJ</TableHead>
          <TableHead className="text-foreground">PG</TableHead>
          <TableHead className="text-foreground">PE</TableHead>
          <TableHead className="text-foreground">PP</TableHead>
          <TableHead className="text-foreground">GF</TableHead>
          <TableHead className="text-foreground">GC</TableHead>
          <TableHead className="text-foreground">DG</TableHead>
          <TableHead className="text-right text-foreground">Pts</TableHead>
        </TableRow>
      </TableHeader>

      {isLoadingMatches || isLoadingTeams || isLoadingPositions ? (
        <Loader2 className="animate-spin" />
      ) : (
        <TableBody className="overflow-hidden max-w-full">
          {positionsData?.map((team, index) => {
            const isFirst = index === 0;
            const isLast = index === positionsData.length - 1;

            const rowStyle = isFirst
              ? "bg-gradient-to-l from-accent/0 to-accent hover:from-accent/20 hover:to-accent/50"
              : isLast
              ? "bg-gradient-to-l from-destructive/0 to-destructive hover:from-destructive/20 hover:to-destructive/50"
              : "hover:bg-mute";

            return (
              <TableRow key={team.id} className={rowStyle}>
                <TableCell className="italic text-center bg-card font-black text-xl">
                  {index + 1}
                </TableCell>
                <TableCell className="flex items-center gap-3">
                  <Image
                    alt={`${team.name} logo`}
                    src={team.logo_url || "/liga_gunta_2.png"}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="font-bold text-lg">{team.name}</span>
                </TableCell>
                <TableCell className="text-lg">{team.played}</TableCell>
                <TableCell className="text-lg">{team.won}</TableCell>
                <TableCell className="text-lg">{team.drawn}</TableCell>
                <TableCell className="text-lg">{team.lost}</TableCell>
                <TableCell className="text-lg">{team.goals_for}</TableCell>
                <TableCell className="text-lg">{team.goals_against}</TableCell>
                <TableCell className="text-lg">
                  {team.goal_difference}
                </TableCell>
                <TableCell className="text-right text-lg">
                  {team.points}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      )}
      <TableCaption>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-accent rounded-md"></div>
          <span className="font-bold">Campeon</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-destructive rounded-md"></div>
          <span className="font-bold">Ultimo</span>
        </div>
      </TableCaption>
    </Table>
  );
};

export default PositionsTable;
