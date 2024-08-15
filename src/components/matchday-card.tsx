import { Match } from "@/lib/types";
import React from "react";
import MatchCard from "./match-card";

type Props = {
  matches: Match[];
};

const MatchDayCard = ({ matches }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-black italic text-lg">Jornada 1</h1>
      <div className="flex flex-col gap-0">
        {matches.map((match) => (
          <MatchCard key={match.id} matchData={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchDayCard;
