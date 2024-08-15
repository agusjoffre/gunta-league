import React from "react";
import { Button } from "./ui/button";
import { Match } from "@/lib/types";
import Image from "next/image";

type Props = {
  matchData: Match;
};

const MatchCard = ({ matchData }: Props) => {
  return (
    <div className="italic flex items-center justify-between border-y-2 border-accent/15 py-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            alt="team logo"
            src="/liga_gunta_2.png"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="font-medium">IvanBoca</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{matchData.home_goals}</span>
          <span className="font-black">VS</span>
          <span className="font-medium">{matchData.away_goals}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            alt="team logo"
            src="/liga_gunta_2.png"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="font-medium">GuidoABG</span>
        </div>
      </div>
      <Button variant={"link"} className="text-accent font-medium">
        stats
      </Button>
    </div>
  );
};

export default MatchCard;
