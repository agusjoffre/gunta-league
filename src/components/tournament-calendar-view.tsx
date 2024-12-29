"use client";
import MatchDayCard from "./matchday-card";
import { Match, MatchDay } from "@/lib/types.d";
import { Button } from "./ui/button";
import GenerateFixtureBtn from "./generate-fixture-btn";
import { useMutation, useQueries, useQuery } from "react-query";
import { getAllMatches, MatchResponse } from "@/lib/actions/matchesActions";
import { getAllMatchdays } from "@/lib/actions/matchday/getAllMatchdays";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  tournamentId: string;
};

const TournamentCalendarView = ({ tournamentId }: Props) => {
  const { toast } = useToast();

  // get matchdays
  const { data: matchdaysData, isLoading: matchdaysLoading } = useQuery({
    queryFn: () => getAllMatchdays(tournamentId),
    queryKey: ["matchdays"],
    onSuccess: (data) => {
      if (!data.success) {
        toast({
          title: "Error",
          description: "Error al obtener las fechas",
          variant: "destructive",
        });
      }
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: "Error al obtener las fechas",
        variant: "destructive",
      });
    },
  });

  const matchdays = matchdaysData?.data as MatchDay[];

  // get matches
  const matchQueries = useQueries(
    (matchdays || []).map((matchday) => ({
      queryKey: ["matches", matchday.id],
      queryFn: () => getAllMatches(matchday.id!),
    }))
  );

  useEffect(() => {
    matchQueries.forEach((query) => {
      if (query.isError) {
        toast({
          title: "Error",
          description: "Error al obtener los partidos",
          variant: "destructive",
        });
      }
    });
  }, [matchQueries]);

  const isLoadingMatches = matchQueries.some((query) => query.isLoading);

  // order matches by matchday
  // display MatchdayCards by order
  return (
    <div className="flex flex-col gap-10 items-center">
      <GenerateFixtureBtn tournamentId={tournamentId} />
      {isLoadingMatches ||
        (matchdaysLoading && <Loader2 className="w-8 h-8 animate-spin" />)}
      {!matchdays ||
      !matchQueries ||
      matchQueries.every((query) => !query.data) ||
      matchQueries.length === 0 ? (
        <p className="italic text-foreground/75 text-lg text-center">
          No hay partidos.
        </p>
      ) : isLoadingMatches || matchdaysLoading ? (
        <Loader2 className="w-8 h-8 animate-spin" />
      ) : (
        <div className="grid grid-cols-3 gap-14 min-w-96">
          {matchdays.map((matchday: MatchDay, i) => {
            const matchDaysMatches = matchQueries[i].data?.data as Match[];
            return (
              <MatchDayCard
                key={matchday.id}
                matchday={matchday}
                matches={matchDaysMatches}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TournamentCalendarView;
