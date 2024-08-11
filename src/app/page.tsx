import MatchStatsCard from "@/components/match-stats-card";
import PositionsTable from "@/components/positions-table";
import TopScorersTable from "@/components/top-scorers-table";
import TournamentInfoCard from "@/components/tournament-info-card";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MatchStatsCard />
      <TournamentInfoCard />
      <PositionsTable />
      <TopScorersTable />
    </main>
  );
};

export default Home;
