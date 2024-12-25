import { Match, MatchDay } from "@/lib/types";
import React from "react";
import MatchCard from "./match-card";

type Props = {
  matches: Match[];
  matchday: MatchDay;
};

const MatchDayCard = ({ matches, matchday }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-black italic text-lg">Jornada {matchday.number}</h1>
      <div className="flex flex-col gap-0">
        {matches.map((match) => (
          <MatchCard key={match.id} matchData={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchDayCard;
