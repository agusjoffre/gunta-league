import MatchStatsCard from "@/components/match-stats-card";
import PositionsTable from "@/components/positions-table";
import TournamentInfoCard from "@/components/tournament-info-card";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PositionsTable />
    </main>
  );
};

export default Home;
