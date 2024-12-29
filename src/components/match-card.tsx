"use client";
import { getOneTeamById } from "@/lib/actions/team/teamsActions";
import { Button } from "./ui/button";
import { Match, Team } from "@/lib/types";
import Image from "next/image";
import { useQuery } from "react-query";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  matchData: Match;
};

const MatchCard = ({ matchData }: Props) => {
  const { toast } = useToast();

  const homeId = matchData.home_id;

  const { data: homeTeamData, isLoading: isLoadingHomeTeam } = useQuery({
    queryKey: ["home_team", homeId],
    queryFn: () => getOneTeamById(homeId),
    onError(err: any) {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast({
          title: "Error on success. Home team",
          description: data.error,
          variant: "destructive",
        });
      }
    },
  });

  const awayId = matchData.away_id;

  const { data: awayTeamData, isLoading: isLoadingAwayTeam } = useQuery({
    queryKey: ["away_team", awayId],
    queryFn: () => getOneTeamById(awayId),
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast({
          title: "Error on success. Away team",
          description: data.error,
          variant: "destructive",
        });
      }
    },
  });

  const homeTeam = homeTeamData?.data as Team;
  const awayTeam = awayTeamData?.data as Team;

  return (
    <div className="italic flex items-center justify-between border-y-2 border-accent/15 py-2">
      <div className="flex items-center gap-4">
        {isLoadingHomeTeam ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            <Image
              alt="team logo"
              src={homeTeam.logo_url || "/liga_gunta_2.png"}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="font-medium text-xs">{homeTeam.name}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-medium">{matchData.home_goals}</span>
          <span className="font-black">VS</span>
          <span className="font-medium">{matchData.away_goals}</span>
        </div>
        {isLoadingAwayTeam ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            <Image
              alt="team logo"
              src={awayTeam.logo_url || "/liga_gunta_2.png"}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="font-medium text-xs">{awayTeam.name}</span>
          </div>
        )}
      </div>
      <Button variant={"link"} className="text-accent font-medium">
        estadisticas
      </Button>
    </div>
  );
};

export default MatchCard;
