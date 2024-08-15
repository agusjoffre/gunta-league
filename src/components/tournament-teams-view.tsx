import React from "react";

type Props = {
  tournament_id: string;
};

const TournamentTeamsView = ({ tournament_id }: Props) => {
  // get teams from tournament_id
  // display TeamCards
  return <div className="grid grid-cols-8 gap-14 min-w-96"></div>;
};

export default TournamentTeamsView;
