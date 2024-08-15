import CreateTeamForm from "@/components/forms/create-team-form";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const TeamsPage = ({ params }: Props) => {
  const { id } = params;

  const tournament_id = id;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateTeamForm tournament_id={tournament_id} />
    </main>
  );
};

export default TeamsPage;
