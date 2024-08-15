"use client";

import { Tournament, TournamentTypes } from "@/lib/types.d";
import TournamentInfoCard from "../tournament-info-card";
import { useMutation, useQuery } from "react-query";
import { getAllTournamentsOfUser } from "@/lib/actions/tournamentActions";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

type Props = {};

const DashboardTournaments = (props: Props) => {
  const { toast } = useToast();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: getAllTournamentsOfUser,
    mutationKey: ["get-all-tournaments"],
    onError(err: any) {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const tournaments: Tournament[] = (data?.data as Tournament[]) || [];

  return (
    <div className="flex flex-col px-16 gap-7">
      <div className="justify-end flex items-center">
        <Button variant={"accent"} className="col-span-4 w-fit ">
          CREAR TORNEO
        </Button>
      </div>
      {isLoading ? (
        <Loader2 className="mx-auto h-12 w-12 animate-spin" />
      ) : (
        <div className="w-full grid grid-cols-4 ">
          {tournaments.length === 0 ? (
            <p className="col-span-4 text-center">No hay torneos.</p>
          ) : (
            tournaments.map((tournament) => (
              <TournamentInfoCard key={tournament.id} tournament={tournament} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardTournaments;
