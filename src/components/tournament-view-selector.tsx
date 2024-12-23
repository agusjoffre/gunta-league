"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import MatchDayCard from "./matchday-card";
import TournamentCalendarView from "./tournament-calendar-view";
import TournamentTeamsView from "./tournament-teams-view";

type Props = {
  tournamentId: string;
};

enum Selected {
  CALENDAR = "calendar",
  TEAMS = "teams",
}

const TournamentViewSelector = ({ tournamentId }: Props) => {
  const [selected, setSelected] = useState<Selected>(Selected.CALENDAR);

  return (
    <div className="w-full px-36 flex flex-col gap-16">
      <div className="flex items-center justify-center gap-10">
        <Button
          onClick={() => setSelected(Selected.CALENDAR)}
          variant={"outline"}
          className={cn(
            "rounded-xl py-8 font-black italic text-2xl",
            selected === Selected.CALENDAR ? "border-accent" : ""
          )}
        >
          CALENDARIO
        </Button>
        <Button
          onClick={() => setSelected(Selected.TEAMS)}
          variant={"outline"}
          className={cn(
            "rounded-xl py-8 font-black italic text-2xl",
            selected === Selected.TEAMS ? "border-accent" : ""
          )}
        >
          EQUIPOS
        </Button>
      </div>
      {selected === Selected.CALENDAR && (
        <TournamentCalendarView tournamentId={tournamentId} />
      )}
      {selected === Selected.TEAMS && (
        <TournamentTeamsView tournament_id={tournamentId} />
      )}
    </div>
  );
};

export default TournamentViewSelector;
