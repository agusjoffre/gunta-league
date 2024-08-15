import React from "react";
import MatchDayCard from "./matchday-card";
import { Match } from "@/lib/types.d";
import { Button } from "./ui/button";
import GenerateFixtureBtn from "./generate-fixture-btn";

type Props = {
  tournamentId: string;
};

const TournamentCalendarView = ({ tournamentId }: Props) => {
  // get matches
  const matches: Match[] = [];
  // order matches by matchday
  // display MatchdayCards by order
  return (
    <div className="flex flex-col gap-10 items-center">
      <GenerateFixtureBtn tournamentId={tournamentId} />
      {!matches || matches.length === 0 ? (
        <p className="italic text-foreground/75 text-lg text-center">
          No hay partidos.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-14 min-w-96">
          <MatchDayCard matches={matches} />
        </div>
      )}
    </div>
  );
};

export default TournamentCalendarView;
